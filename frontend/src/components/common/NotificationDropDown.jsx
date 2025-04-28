import React from 'react';
import Icon from './Icon';

const NotificationsDropdown = ({ notifications, onClose }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="notifications-dropdown">
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button className="btn-icon" onClick={onClose}>
            <Icon name="x" size="0.8em" />
          </button>
        </div>
        <div className="notification-item">
          <div className="notification-content">
            <p>Vous n'avez aucune notification</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-dropdown">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="btn-icon" onClick={onClose}>
          <Icon name="x" size="0.8em" />
        </button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-icon">
              <Icon name={notification.icon || 'bell'} />
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <div className="notification-time">
                {notification.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="notifications-footer">
        <a href="/notifications">Voir toutes les notifications</a>
      </div>
    </div>
  );
};

export default NotificationsDropdown;