import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/projectService';
import Icon from '../common/Icon';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getFilteredProjects = () => {
    if (filter === 'all') return projects;
    if (filter === 'active') return projects.filter(p => p.status === 'ACTIVE');
    if (filter === 'completed') return projects.filter(p => p.status === 'COMPLETED');
    if (filter === 'archived') return projects.filter(p => p.status === 'ARCHIVED');
    return projects;
  };

  const filteredProjects = getFilteredProjects();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des projets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <Icon name="alert-circle" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Mes Projets</h1>
        <div className="header-actions">
          <Link to="/projects/new" className="btn-primary">
            <Icon name="plus" /> Nouveau Projet
          </Link>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Actifs
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Terminés
          </button>
          <button 
            className={filter === 'archived' ? 'active' : ''} 
            onClick={() => setFilter('archived')}
          >
            Archivés
          </button>
        </div>
        <div className="search-box">
          <Icon name="search" />
          <input type="text" placeholder="Rechercher un projet..." />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="folder" />
          </div>
          <h3>Aucun projet trouvé</h3>
          <p>
            {filter === 'all' 
              ? "Vous n'avez pas encore créé de projet. Commencez par en créer un nouveau !" 
              : "Aucun projet ne correspond à ce filtre."}
          </p>
          <Link to="/projects/new" className="btn-primary">
            <Icon name="plus" /> Créer un projet
          </Link>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3>{project.name}</h3>
                <span className={`project-status ${project.status.toLowerCase()}`}>
                  {project.status === 'ACTIVE' ? 'Actif' : 
                   project.status === 'COMPLETED' ? 'Terminé' : 
                   project.status === 'ARCHIVED' ? 'Archivé' : project.status}
                </span>
              </div>
              <div className="project-card-body">
                <p className="project-description">{project.description || 'Aucune description'}</p>
                <div className="project-meta">
                  <div className="project-dates">
                    <div className="project-date">
                      <span className="date-label">Début:</span>
                      <span className="date-value">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString('fr-FR') : 'Non défini'}
                      </span>
                    </div>
                    <div className="project-date">
                      <span className="date-label">Fin:</span>
                      <span className="date-value">
                        {project.endDate ? new Date(project.endDate).toLocaleDateString('fr-FR') : 'Non défini'}
                      </span>
                    </div>
                  </div>
                  <div className="project-progress">
                    <div className="progress-label">
                      <span>Progression</span>
                      <span>{project.progress || 0}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="project-tasks">
                  <div className="task-stat">
                    <span className="task-stat-label">Total</span>
                    <span className="task-stat-value">{project.totalTasks || 0}</span>
                  </div>
                  <div className="task-stat">
                    <span className="task-stat-label">En cours</span>
                    <span className="task-stat-value">{project.inProgressTasks || 0}</span>
                  </div>
                  <div className="task-stat">
                    <span className="task-stat-label">Terminées</span>
                    <span className="task-stat-value">{project.completedTasks || 0}</span>
                  </div>
                </div>
              </div>
              <div className="project-card-footer">
                <Link to={`/projects/${project.id}`} className="btn-secondary">
                  <Icon name="eye" /> Voir
                </Link>
                <Link to={`/projects/${project.id}/edit`} className="btn-secondary">
                  <Icon name="edit-2" /> Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;