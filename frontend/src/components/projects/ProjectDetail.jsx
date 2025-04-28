import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById, deleteProject } from '../../api/projectService';
import { getTasks } from '../../api/taskService';
import Icon from '../common/Icon';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectById(id);
        setProject(projectData);
        
        // Récupérer les tâches liées au projet
        const projectTasks = await getTasks({ projectId: id });
        setTasks(projectTasks);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement du projet");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet et toutes ses tâches associées ?')) {
      return;
    }
    
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression du projet");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-badge status-badge--active';
      case 'COMPLETED': return 'status-badge status-badge--completed';
      case 'ARCHIVED': return 'status-badge status-badge--archived';
      default: return 'status-badge status-badge--active';
    }
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du projet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <Icon name="alert-circle" />
        <p>{error}</p>
        <button 
          className="btn btn--primary" 
          onClick={() => navigate('/projects')}
        >
          Retour aux projets
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="not-found">
        <Icon name="search" size="3em" />
        <h2>Projet non trouvé</h2>
        <p>Le projet demandé n'existe pas ou a été supprimé.</p>
        <Link to="/projects" className="btn btn--primary">
          <Icon name="arrow-left" /> Voir tous les projets
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-detail__header">
        <div className="project-detail__title">
          <h1>{project.name}</h1>
          <span className={getStatusClass(project.status)}>
            {project.status === 'ACTIVE' ? 'Actif' : 
             project.status === 'COMPLETED' ? 'Terminé' : 
             project.status === 'ARCHIVED' ? 'Archivé' : 'Actif'}
          </span>
        </div>

        <div className="project-detail__actions">
          <Link to={`/projects/${id}/edit`} className="btn btn--secondary">
            <Icon name="edit-2" /> Modifier
          </Link>
          <button onClick={handleDelete} className="btn btn--danger">
            <Icon name="trash-2" /> Supprimer
          </button>
        </div>
      </div>

      <div className="project-detail__tabs">
        <button 
          className={activeTab === 'overview' ? 'tab-button tab-button--active' : 'tab-button'} 
          onClick={() => setActiveTab('overview')}
        >
          <Icon name="info" /> Vue d'ensemble
        </button>
        <button 
          className={activeTab === 'tasks' ? 'tab-button tab-button--active' : 'tab-button'} 
          onClick={() => setActiveTab('tasks')}
        >
          <Icon name="check-square" /> Tâches
        </button>
        <button 
          className={activeTab === 'activity' ? 'tab-button tab-button--active' : 'tab-button'} 
          onClick={() => setActiveTab('activity')}
        >
          <Icon name="activity" /> Activité
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="project-detail__overview">
          <div className="card">
            <div className="card__body">
              <div className="project-detail__description">
                <h2>Description</h2>
                <p>{project.description || 'Aucune description disponible pour ce projet.'}</p>
              </div>
              
              <div className="project-detail__meta">
                <div className="project-detail__dates">
                  <div className="project-detail__date">
                    <h3>Date de début</h3>
                    <p>{getFormattedDate(project.startDate)}</p>
                  </div>
                  <div className="project-detail__date">
                    <h3>Date de fin prévue</h3>
                    <p>{getFormattedDate(project.endDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="project-detail__stats">
                <h2>Progression</h2>
                <div className="progress-bar">
                  <div 
                    className="progress-bar__fill" 
                    style={{ width: `${project.completionRate || 0}%` }}
                  ></div>
                </div>
                <div className="project-detail__task-stats">
                  <div className="task-stat">
                    <span className="task-stat__value">{tasks.length}</span>
                    <span className="task-stat__label">Tâches totales</span>
                  </div>
                  <div className="task-stat">
                    <span className="task-stat__value">
                      {tasks.filter(t => t.status === 'DONE').length}
                    </span>
                    <span className="task-stat__label">Terminées</span>
                  </div>
                  <div className="task-stat">
                    <span className="task-stat__value">
                      {tasks.filter(t => t.status === 'IN_PROGRESS').length}
                    </span>
                    <span className="task-stat__label">En cours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="project-detail__tasks">
          <div className="card">
            <div className="card__header">
              <h2>Tâches du projet</h2>
              <Link to={`/tasks/new?projectId=${id}`} className="btn btn--primary">
                <Icon name="plus" /> Nouvelle tâche
              </Link>
            </div>
            <div className="card__body">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <Icon name="clipboard" size="3em" />
                  <h3>Aucune tâche</h3>
                  <p>Ce projet n'a pas encore de tâches. Commencez par en créer une!</p>
                  <Link to={`/tasks/new?projectId=${id}`} className="btn btn--primary">
                    <Icon name="plus" /> Créer une tâche
                  </Link>
                </div>
              ) : (
                <ul className="task-list">
                  {tasks.map(task => (
                    <li key={task.id} className="task-list__item">
                      <div className={`task-list__status task-list__status--${task.status?.toLowerCase() || 'todo'}`}></div>
                      <div className="task-list__content">
                        <h3>{task.title}</h3>
                        <p>{task.description?.substring(0, 100)}...</p>
                      </div>
                      <div className="task-list__meta">
                        <span className={`priority-badge priority-badge--${task.priority?.toLowerCase() || 'medium'}`}>
                          {task.priority || 'Medium'}
                        </span>
                        {task.dueDate && (
                          <span className="task-list__date">
                            <Icon name="calendar" />
                            {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                      </div>
                      <div className="task-list__actions">
                        <Link to={`/tasks/${task.id}`} className="btn btn--icon">
                          <Icon name="eye" />
                        </Link>
                        <Link to={`/tasks/${task.id}/edit`} className="btn btn--icon">
                          <Icon name="edit-2" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="project-detail__activity">
          <div className="card">
            <div className="card__header">
              <h2>Activité récente</h2>
            </div>
            <div className="card__body">
              <div className="timeline">
                {/* Exemple d'activité */}
                <div className="timeline__item">
                  <div className="timeline__icon">
                    <Icon name="plus" />
                  </div>
                  <div className="timeline__content">
                    <span className="timeline__date">Aujourd'hui, 10:30</span>
                    <h4>Nouvelle tâche ajoutée</h4>
                    <p>La tâche "Préparer la présentation" a été créée</p>
                  </div>
                </div>

                <div className="timeline__item">
                  <div className="timeline__icon">
                    <Icon name="edit-2" />
                  </div>
                  <div className="timeline__content">
                    <span className="timeline__date">Hier, 15:45</span>
                    <h4>Projet modifié</h4>
                    <p>La description du projet a été mise à jour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;