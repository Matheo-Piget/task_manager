import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, markAsRead, markAllAsRead } from '../../api/notificationService';
import Icon from '../../components/common/Icon';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications(page, pageSize);
      
      if (page === 0) {
        setNotifications(response.content);
      } else {
        setNotifications(prev => [...prev, ...response.content]);
      }
      
      setHasMore(!response.last);
      setLoading(false);
    } catch (err) {
      setError("Impossible de charger les notifications");
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (err) {
      console.error("Erreur lors du marquage de la notification comme lue:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Erreur lors du marquage de toutes les notifications comme lues:", err);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
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
    return '#';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (error) {
    return (
      <div className="notifications-page">
        <div className="page-header">
          <h1>Notifications</h1>
          <button className="btn-secondary" onClick={fetchNotifications}>
            <Icon name="refresh-cw" /> Réessayer
          </button>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notifications</h1>
        <button className="btn-secondary" onClick={handleMarkAllAsRead}>
          <Icon name="check-circle" /> Tout marquer comme lu
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <Icon name="bell-off" size="3em" />
          <h3>Pas de notifications</h3>
          <p>Vous n'avez pas de notifications pour le moment.</p>
        </div>
      ) : (
        <div className="notifications-list-page">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                <Icon name={getIconByType(notification.type)} />
              </div>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <div className="notification-time">
                  {formatDate(notification.createdAt)}
                </div>
                {(notification.task || notification.project) && (
                  <div className="notification-actions">
                    <Link to={getNotificationLink(notification)} className="btn-link">
                      <Icon name="external-link" /> Voir le détail
                    </Link>
                    {!notification.read && (
                      <button 
                        className="btn-link" 
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Icon name="check" /> Marquer comme lu
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {hasMore && (
            <div className="load-more">
              <button 
                className="btn-secondary" 
                onClick={loadMore} 
                disabled={loading}
              >
                {loading ? 'Chargement...' : 'Charger plus'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;