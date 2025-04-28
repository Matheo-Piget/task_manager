import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { getUnreadNotifications, markAsRead, markAllAsRead } from '../../api/notificationService';

const NotificationsDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getUnreadNotifications();
        setNotifications(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id, event) => {
    event.stopPropagation();
    try {
      await markAsRead(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error("Erreur lors du marquage de la notification comme lue:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications([]);
    } catch (err) {
      console.error("Erreur lors du marquage de toutes les notifications comme lues:", err);
    }
  };

  // Fonction pour obtenir l'icône en fonction du type de notification
  const getIconByType = (type) => {
    switch (type) {
      case 'TASK_DUE_SOON': return 'clock';
      case 'TASK_OVERDUE': return 'alert-circle';
      case 'TASK_ASSIGNED': return 'user-plus';
      case 'TASK_COMPLETED': return 'check-circle';
      case 'PROJECT_UPDATE': return 'briefcase';
      case 'SYSTEM_MESSAGE': return 'info';
      default: return 'bell';
    }
  };

  // Fonction pour obtenir le lien en fonction du type et de la référence
  const getNotificationLink = (notification) => {
    if (notification.task) {
      return `/tasks/${notification.task.id}`;
    } else if (notification.project) {
      return `/projects/${notification.project.id}`;
    }
    return '/notifications';
  };

  // Fonction pour formater la date relative
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`;
    return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`;
  };

  if (loading) {
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
            <p>Chargement des notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
            <p className="text-danger">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
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
            <p>Vous n'avez aucune notification non lue</p>
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
        {notifications.map((notification) => (
          <Link 
  key={notification.id} 
  to={getNotificationLink(notification)}
  className="notification-item"
  onClick={(event) => handleMarkAsRead(notification.id, event)}
>
            <div className="notification-icon">
              <Icon name={getIconByType(notification.type)} />
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <div className="notification-time">
                {formatRelativeTime(notification.createdAt)}
              </div>
            </div>
            <button className="btn-icon notification-mark-read" onClick={(e) => handleMarkAsRead(notification.id, e)}>
              <Icon name="check" size="0.8em" />
            </button>
          </Link>
        ))}
      </div>
      <div className="notifications-footer">
        <button className="btn-link" onClick={handleMarkAllAsRead}>
          Marquer tout comme lu
        </button>
        <Link to="/notifications" onClick={onClose}>
          Voir toutes les notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationsDropdown;