import { Router } from 'express';

const router = Router();

router.get('/questions', (req, res) => {
  const { topic_id, limit } = req.query;
  const db = req.db;
  let questions;
  if (topic_id) {
    questions = db.prepare('SELECT * FROM questions WHERE topic_id = ?').all(topic_id);
  } else {
    questions = db.prepare('SELECT * FROM questions').all();
  }
  const parsed = questions.map(q => ({ ...q, options: JSON.parse(q.options) }));
  const shuffled = parsed.sort(() => Math.random() - 0.5);
  if (limit) {
    res.json(shuffled.slice(0, parseInt(limit)));
  } else {
    res.json(shuffled);
  }
});

router.post('/submit', (req, res) => {
  const { topic_id, answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Answers array is required' });
  }
  const db = req.db;
  const score = answers.filter(a => a.correct).length;
  db.run('INSERT INTO quiz_attempts (topic_id, score, total) VALUES (?, ?, ?)', [topic_id || null, score, answers.length]);
  res.json({ score, total: answers.length, results: answers });
});

router.get('/attempts', (req, res) => {
  const attempts = req.db.prepare('SELECT * FROM quiz_attempts ORDER BY date DESC LIMIT 50').all();
  res.json(attempts);
});

export default router;
