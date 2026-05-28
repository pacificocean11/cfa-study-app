import express from 'express';
import cors from 'cors';
import getDb from './database.js';
import flashcardsRouter from './routes/flashcards.js';
import quizRouter from './routes/quiz.js';
import progressRouter from './routes/progress.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  getDb().then(db => {
    req.db = db;
    next();
  }).catch(next);
});

app.use('/api/flashcards', flashcardsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/progress', progressRouter);

app.get('/api/topics', (req, res) => {
  const topics = req.db.prepare('SELECT * FROM topics').all();
  res.json(topics);
});

app.listen(PORT, () => {
  console.log(`CFA Study API running on http://localhost:${PORT}`);
});
