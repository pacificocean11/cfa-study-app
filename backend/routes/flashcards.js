import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const { topic_id } = req.query;
  const db = req.db;
  let flashcards;
  if (topic_id) {
    flashcards = db.prepare('SELECT * FROM flashcards WHERE topic_id = ?').all(topic_id);
  } else {
    flashcards = db.prepare('SELECT * FROM flashcards').all();
  }
  res.json(flashcards);
});

router.get('/:id', (req, res) => {
  const card = req.db.prepare('SELECT * FROM flashcards WHERE id = ?').get(req.params.id);
  if (!card) return res.status(404).json({ error: 'Flashcard not found' });
  res.json(card);
});

router.post('/:id/review', (req, res) => {
  const { confidence } = req.body;
  if (!confidence || confidence < 1 || confidence > 5) {
    return res.status(400).json({ error: 'Confidence must be between 1 and 5' });
  }
  const card = req.db.prepare('SELECT * FROM flashcards WHERE id = ?').get(req.params.id);
  if (!card) return res.status(404).json({ error: 'Flashcard not found' });
  req.db.run('INSERT INTO flashcard_reviews (flashcard_id, confidence) VALUES (?, ?)', [req.params.id, confidence]);
  res.json({ success: true });
});

export default router;
