import React, { useContext , useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Icon from '../common/Icon';
import NotificationsDropdown from '../common/NotificationDropDown';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    {
      icon: 'check-circle',
      title: 'Tâche terminée',
      message: 'Vous avez terminé la tâche "Mise à jour du dashboard"',
      time: 'Il y a 10 minutes'
    },
    {
      icon: 'alert-circle',
      title: 'Rappel',
      message: 'La tâche "Finaliser le rapport" est prévue pour demain',
      time: 'Il y a 30 minutes'
    },
    {
      icon: 'message-square',
      title: 'Nouveau commentaire',
      message: 'Alex a commenté sur la tâche "Refonte du site web"',
      time: 'Il y a 2 heures'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  }
  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            <Icon name="trello" size="1.5em" />
            <span>TaskManager</span>
          </Link>
        </div>

        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Icon name="home" />
              <span>Tableau de bord</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/tasks" className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}>
              <Icon name="check-square" />
              <span>Tâches</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>
              <Icon name="folder" />
              <span>Projets</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/analytics" className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
              <Icon name="bar-chart-2" />
              <span>Analyses</span>
            </Link>
          </li>

          <li className="nav-section">Actions rapides</li>
          
          <li className="nav-item">
            <Link to="/tasks/new" className={`nav-link ${location.pathname === '/tasks/new' ? 'active' : ''}`}>
              <Icon name="plus-circle" />
              <span>Nouvelle tâche</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/projects/new" className={`nav-link ${location.pathname === '/projects/new' ? 'active' : ''}`}>
              <Icon name="folder-plus" />
              <span>Nouveau projet</span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <Link to="/profile" className={`profile-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            <div className="avatar">
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.firstName || user?.username}</span>
              <span className="user-role">
                <Icon name="user" size="0.8em" /> 
                Utilisateur
              </span>
            </div>
          </Link>
          
          <button onClick={handleLogout} className="logout-button">
            <Icon name="log-out" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-search">
            <Icon name="search" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          
          <div className="header-actions">
            <div style={{ position: 'relative' }}>
              <button 
                className="header-button" 
                onClick={toggleNotifications}
              >
                <Icon name="bell" />
                <span className="notification-badge">3</span>
              </button>
              
              {showNotifications && (
                <NotificationsDropdown 
                  notifications={mockNotifications} 
                  onClose={() => setShowNotifications(false)} 
                />
              )}
            </div>
            
            <button className="header-button">
              <Icon name="help-circle" />
            </button>
            
            <Link to="/profile" className="header-profile">
              <div className="avatar-small">
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
            </Link>
          </div>
        </header>
        
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;