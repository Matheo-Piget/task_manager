import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTaskById, deleteTask, updateTask } from '../../api/taskService';
import Icon from '../common/Icon';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'LOW': return 'priority-low';
      case 'MEDIUM': return 'priority-medium';
      case 'HIGH': return 'priority-high';
      case 'URGENT': return 'priority-urgent';
      default: return 'priority-medium';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'TODO': return 'À faire';
      case 'IN_PROGRESS': return 'En cours';
      case 'DONE': return 'Terminée';
      default: return status;
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTask(task.id, { ...task, status: newStatus });
      setTask(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteTask(id);
      navigate('/tasks');
    } catch (err) {
      setError(err);
      setIsDeleting(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Chargement de la tâche...</p>
    </div>
  );
  
  if (error) return (
    <div className="card error-card">
      <div className="card-body">
        <h2>Erreur lors du chargement de la tâche</h2>
        <p>{error.message || "Une erreur s'est produite"}</p>
        <Link to="/tasks" className="btn-secondary">Retour à la liste</Link>
      </div>
    </div>
  );

  return (
    <div className="task-detail-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <Link to="/tasks">Tâches</Link> / <span>Détail de la tâche</span>
        </div>
        <div className="header-actions">
          <Link to={`/tasks/${id}/edit`} className="btn-secondary">
            <Icon name="" /> Modifier
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn-danger"
            disabled={isDeleting}
          >
            <Icon name="" /> {isDeleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>

      <div className="card task-detail-card">
        <div className="card-header">
          <h2>{task.title}</h2>
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="card-body">
          <div className="detail-section">
            <h3>Description</h3>
            <div className="task-description-content">
              {task.description || "Aucune description fournie"}
            </div>
          </div>
          
          <div className="task-meta-grid">
            <div className="detail-section">
              <h3>Statut</h3>
              <div className="status-selector">
                <div className={`status-option ${task.status === 'TODO' ? 'active' : ''}`} 
                     onClick={() => handleStatusChange('TODO')}>
                  <span className="status-dot todo"></span>
                  À faire
                </div>
                <div className={`status-option ${task.status === 'IN_PROGRESS' ? 'active' : ''}`}
                     onClick={() => handleStatusChange('IN_PROGRESS')}>
                  <span className="status-dot in-progress"></span>
                  En cours
                </div>
                <div className={`status-option ${task.status === 'DONE' ? 'active' : ''}`}
                     onClick={() => handleStatusChange('DONE')}>
                  <span className="status-dot done"></span>
                  Terminée
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h3>Date d'échéance</h3>
              <div className="due-date-display">
                <Icon name="calendar" />
                {formatDate(task.dueDate)}
              </div>
            </div>
          </div>
          
          {task.tags && task.tags.length > 0 && (
            <div className="detail-section">
              <h3>Tags</h3>
              <div className="task-tags">
                {task.tags.map(tag => (
                  <span key={tag.id} className="task-tag" style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="card-footer">
          <button onClick={() => navigate('/tasks')} className="btn-secondary">
            <Icon name="" /> Retour à la liste
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;