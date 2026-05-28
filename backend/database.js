import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'cfa.db');

let dbInstance = null;
let initPromise = null;

function prepare(db, sql) {
  return {
    run(...params) {
      const stmt = db.prepare(sql);
      if (params.length > 0 && Array.isArray(params[0])) {
        stmt.bind(params[0]);
      } else if (params.length > 0) {
        stmt.bind(params);
      }
      stmt.step();
      stmt.free();
    },
    get(...params) {
      const stmt = db.prepare(sql);
      if (params.length > 0) {
        stmt.bind(params);
      }
      if (stmt.step()) {
        const row = stmt.getAsObject();
        stmt.free();
        return row;
      }
      stmt.free();
      return null;
    },
    all(...params) {
      const stmt = db.prepare(sql);
      if (params.length > 0) {
        stmt.bind(params);
      }
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return rows;
    },
  };
}

function saveDb() {
  if (!dbInstance) return;
  const data = dbInstance.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

export async function initDatabase() {
  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    dbInstance = new SQL.Database(buffer);
  } else {
    dbInstance = new SQL.Database();
  }

  dbInstance.run(`CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#4A90D9'
  )`);
  dbInstance.run(`CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty TEXT CHECK(difficulty IN ('easy','medium','hard')) DEFAULT 'medium',
    FOREIGN KEY (topic_id) REFERENCES topics(id)
  )`);
  dbInstance.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    difficulty TEXT CHECK(difficulty IN ('easy','medium','hard')) DEFAULT 'medium',
    FOREIGN KEY (topic_id) REFERENCES topics(id)
  )`);
  dbInstance.run(`CREATE TABLE IF NOT EXISTS quiz_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  dbInstance.run(`CREATE TABLE IF NOT EXISTS flashcard_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flashcard_id INTEGER NOT NULL,
    confidence INTEGER CHECK(confidence BETWEEN 1 AND 5) DEFAULT 3,
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(id)
  )`);
  dbInstance.run(`CREATE TABLE IF NOT EXISTS study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER,
    duration_minutes INTEGER NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  saveDb();

  return getApi();
}

function getApi() {
  return {
    prepare: (sql) => prepare(dbInstance, sql),
    run: (sql, params) => {
      dbInstance.run(sql, params);
      saveDb();
    },
    exec: (sql) => dbInstance.exec(sql),
    save: saveDb,
  };
}

export default function getDb() {
  if (dbInstance) return Promise.resolve(getApi());
  if (!initPromise) {
    initPromise = initDatabase();
  }
  return initPromise;
}
