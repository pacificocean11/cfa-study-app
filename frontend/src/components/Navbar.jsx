import './Navbar.css';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'flashcards', label: 'Flashcards', icon: '🃏' },
  { key: 'quizzes', label: 'Quizzes', icon: '📝' },
  { key: 'progress', label: 'Progress', icon: '📈' },
];

export default function Navbar({ current, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => onNavigate('dashboard')}>
          <span className="brand-icon">📘</span>
          <span className="brand-text">CFA Study App</span>
        </div>
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-link ${current === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
