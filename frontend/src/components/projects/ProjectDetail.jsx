import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
      case 'ACTIVE': return 'status-active';
      case 'COMPLETED': return 'status-completed';
      case 'ARCHIVED': return 'status-archived';
      default: return 'status-active';
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
        <Link to="/projects" className="btn-secondary">
          Retour aux projets
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="empty-state">
        <h2>Projet non trouvé</h2>
        <p>Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/projects" className="btn-primary">
          Voir tous les projets
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <Link to="/projects">Projets</Link> / <span>{project.name}</span>
        </div>
        <div className="header-actions">
          <Link to={`/projects/${id}/edit`} className="btn-secondary">
            <Icon name="edit-2" /> Modifier
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            <Icon name="trash-2" /> Supprimer
          </button>
        </div>
      </div>

      <div className="project-header-card">
        <div className="project-info">
          <h1>{project.name}</h1>
          <div className={`project-status ${getStatusClass(project.status)}`}>
            {project.status === 'ACTIVE' ? 'Actif' : 
             project.status === 'COMPLETED' ? 'Terminé' : 
             project.status === 'ARCHIVED' ? 'Archivé' : project.status}
          </div>
        </div>
        <div className="project-meta-row">
          <div className="project-meta-item">
            <Icon name="calendar" />
            <span>Début: {getFormattedDate(project.startDate)}</span>
          </div>
          <div className="project-meta-item">
            <Icon name="calendar" />
            <span>Fin prévue: {getFormattedDate(project.endDate)}</span>
          </div>
          <div className="project-meta-item">
            <Icon name="bar-chart-2" />
            <div className="progress-container">
              <span>Progression: {project.progress || 0}%</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          <Icon name="grid" /> Vue d'ensemble
        </button>
        <button 
          className={activeTab === 'tasks' ? 'active' : ''} 
          onClick={() => setActiveTab('tasks')}
        >
          <Icon name="check-square" /> Tâches
        </button>
        <button 
          className={activeTab === 'timeline' ? 'active' : ''} 
          onClick={() => setActiveTab('timeline')}
        >
          <Icon name="clock" /> Chronologie
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="project-overview">
          <div className="card">
            <div className="card-header">
              <h3>Description</h3>
            </div>
            <div className="card-body">
              <p className="project-description">
                {project.description || "Aucune description n'a été fournie pour ce projet."}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Statistiques</h3>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{project.totalTasks || 0}</div>
                  <div className="stat-label">Tâches totales</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{project.inProgressTasks || 0}</div>
                  <div className="stat-label">En cours</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{project.completedTasks || 0}</div>
                  <div className="stat-label">Terminées</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {project.completedTasks && project.totalTasks 
                      ? Math.round((project.completedTasks / project.totalTasks) * 100) 
                      : 0}%
                  </div>
                  <div className="stat-label">Taux d'achèvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="project-tasks-tab">
          <div className="card">
            <div className="card-header">
              <h3>Tâches du projet</h3>
              <Link to="/tasks/new" className="btn-secondary btn-sm">
                <Icon name="plus" /> Nouvelle tâche
              </Link>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <p>Aucune tâche n'a encore été créée pour ce projet.</p>
                  <Link to="/tasks/new" className="btn-primary">
                    <Icon name="plus" /> Créer une tâche
                  </Link>
                </div>
              ) : (
                <div className="tasks-list">
                  {tasks.map(task => (
                    <div key={task.id} className="task-list-item">
                      <div className={`task-status-indicator ${task.status.toLowerCase()}`}></div>
                      <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>{task.description?.substring(0, 100)}{task.description?.length > 100 ? '...' : ''}</p>
                        <div className="task-meta">
                          <span className={`task-priority ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>
                          <span className="task-due-date">
                            <Icon name="calendar" />
                            {getFormattedDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <Link to={`/tasks/${task.id}`} className="btn-icon">
                          <Icon name="eye" />
                        </Link>
                        <Link to={`/tasks/${task.id}/edit`} className="btn-icon">
                          <Icon name="edit-2" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="project-timeline">
          <div className="card">
            <div className="card-header">
              <h3>Chronologie du projet</h3>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="timeline-start">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">{getFormattedDate(project.startDate)}</div>
                  <div className="timeline-label">Début du projet</div>
                </div>
                
                {tasks.filter(task => task.status === 'DONE').slice(0, 3).map(task => (
                  <div key={task.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">{getFormattedDate(task.completedAt || task.dueDate)}</div>
                    <div className="timeline-content">
                      <h4>{task.title}</h4>
                      <p>Tâche terminée</p>
                    </div>
                  </div>
                ))}
                
                <div className="timeline-end">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">{getFormattedDate(project.endDate)}</div>
                  <div className="timeline-label">Fin prévue</div>
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