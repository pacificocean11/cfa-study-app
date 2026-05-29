import './Navbar.css';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'flashcards', label: 'Flashcards', icon: 'style' },
  { key: 'quizzes', label: 'Quizzes', icon: 'quiz' },
  { key: 'progress', label: 'Progress', icon: 'trending_up' },
];

export default function Navbar({ current, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => onNavigate('dashboard')}>
          <span className="material-symbols-outlined brand-icon">menu_book</span>
          <span className="brand-text">CFA Study App</span>
        </div>
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-link ${current === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
