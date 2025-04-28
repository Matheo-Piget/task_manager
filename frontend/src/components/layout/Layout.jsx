import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Icon from '../common/Icon';
import NotificationsDropdown from '../common/NotificationDropDown';
import { getUnreadCount } from '../../api/notificationService';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Déplacé ici à l'intérieur du composant

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch unread notifications count', error);
      }
    };

    fetchUnreadCount();
    // Mettre à jour le compteur toutes les minutes
    const interval = setInterval(fetchUnreadCount, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            <Icon name="trello" size="1.5em" />
            <span>TaskManager</span>
          </Link>
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Icon name={sidebarExpanded ? "x" : "menu"} />
          </button>
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
                aria-label="Notifications"
              >
                <Icon name="bell" />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
              </button>

              {showNotifications && (
                <NotificationsDropdown onClose={closeNotifications} />
              )}
            </div>

            <button className="header-button" aria-label="Aide">
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