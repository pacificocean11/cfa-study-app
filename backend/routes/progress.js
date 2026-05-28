import { Router } from 'express';

const router = Router();

router.get('/overview', (req, res) => {
  const db = req.db;
  const totalFlashcards = db.prepare('SELECT COUNT(*) as count FROM flashcards').get().count;
  const totalQuestions = db.prepare('SELECT COUNT(*) as count FROM questions').get().count;
  const quizData = db.prepare('SELECT COUNT(*) as attempts, COALESCE(SUM(score), 0) as correct, COALESCE(SUM(total), 0) as total FROM quiz_attempts').get();
  const reviewedCards = db.prepare('SELECT COUNT(DISTINCT flashcard_id) as count FROM flashcard_reviews').get().count;
  const avgConfidence = db.prepare('SELECT COALESCE(AVG(confidence), 0) as avg FROM flashcard_reviews').get().avg;

  const topicStats = db.exec(`
    SELECT t.id, t.name, t.color,
      (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id = t.id) as flashcard_count,
      (SELECT COUNT(*) FROM questions q WHERE q.topic_id = t.id) as question_count,
      (SELECT COALESCE(SUM(qa.score), 0) FROM quiz_attempts qa WHERE qa.topic_id = t.id) as quiz_correct,
      (SELECT COALESCE(SUM(qa.total), 0) FROM quiz_attempts qa WHERE qa.topic_id = t.id) as quiz_total
    FROM topics t
  `);

  const parsedStats = topicStats[0]?.values.map(row => ({
    id: row[0], name: row[1], color: row[2],
    flashcard_count: row[3], question_count: row[4],
    quiz_correct: row[5], quiz_total: row[6],
  })) || [];

  res.json({
    totalFlashcards,
    totalQuestions,
    reviewedCards,
    avgConfidence: Math.round(avgConfidence * 10) / 10,
    quizStats: {
      attempts: quizData.attempts,
      correct: quizData.correct,
      total: quizData.total,
      percentage: quizData.total > 0 ? Math.round((quizData.correct / quizData.total) * 100) : 0,
    },
    topicStats: parsedStats,
  });
});

router.post('/session', (req, res) => {
  const { topic_id, duration_minutes } = req.body;
  req.db.run('INSERT INTO study_sessions (topic_id, duration_minutes) VALUES (?, ?)', [topic_id || null, duration_minutes || 0]);
  res.json({ success: true });
});

router.get('/sessions', (req, res) => {
  const sessions = req.db.exec(`
    SELECT ss.*, t.name as topic_name
    FROM study_sessions ss
    LEFT JOIN topics t ON t.id = ss.topic_id
    ORDER BY ss.date DESC
    LIMIT 100
  `);
  const parsed = sessions[0]?.values.map(row => ({
    id: row[0], topic_id: row[1], duration_minutes: row[2], date: row[3], topic_name: row[4],
  })) || [];
  res.json(parsed);
});

export default router;
