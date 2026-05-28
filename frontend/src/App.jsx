import { useState, useEffect } from 'react';
import { api } from './api.js';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Flashcards from './pages/Flashcards.jsx';
import Quizzes from './pages/Quizzes.jsx';
import Progress from './pages/Progress.jsx';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api('/api/topics')
      .then(r => r.json())
      .then(setTopics)
      .catch(() => {});
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard topics={topics} />;
      case 'flashcards': return <Flashcards topics={topics} />;
      case 'quizzes': return <Quizzes topics={topics} />;
      case 'progress': return <Progress />;
      default: return <Dashboard topics={topics} />;
    }
  };

  return (
    <div className="app">
      <Navbar current={page} onNavigate={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
