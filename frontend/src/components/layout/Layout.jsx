import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Icon from '../common/Icon';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Si l'utilisateur est sur la page de login, ne pas afficher le layout
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">TaskManager</div>
        </div>

        <ul className="nav-list">
          <li className="nav-item">
            <li className="nav-item">
              <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <span className="nav-icon"><Icon name="home" /></span>
                Dashboard
              </Link>
            </li>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}>
              <span className="nav-icon"><Icon name="list" /></span>
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks/new" className={`nav-link ${location.pathname === '/tasks/new' ? 'active' : ''}`}>
              <span className="nav-icon">+</span>
              Create Task
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
              <span className="nav-icon"><Icon name="bar-chart-2" /></span>
              Analytics
            </Link>
          </li>
        </ul>

        <div className="user-profile">
          {user && (
            <div className="profile-link">
              <div className="avatar">
                {user.firstName ? user.firstName.charAt(0) : 'U'}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user.firstName || 'User'}</div>
                <button onClick={handleLogout} className="logout-button">
                  <Icon name="log-out" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;