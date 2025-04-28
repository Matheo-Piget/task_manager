import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/projectService';
import Icon from '../common/Icon';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    let filtered = projects;
    
    // Filtrer par statut
    if (filter === 'active') filtered = filtered.filter(p => p.status === 'ACTIVE');
    if (filter === 'completed') filtered = filtered.filter(p => p.status === 'COMPLETED');
    if (filter === 'archived') filtered = filtered.filter(p => p.status === 'ARCHIVED');
    
    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  if (loading) {
    return (
      <div className="loading-container animate-spin">
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
        <button 
          className="btn-primary" 
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Mes Projets</h1>
        <div className="header-actions">
          <Link to="/projects/new" className="btn-primary">
            <Icon name="" /> Nouveau Projet
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
          <input 
            type="text" 
            placeholder="Rechercher un projet..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="folder" />
          </div>
          <h3>Aucun projet trouvé</h3>
          <p>
            {filter === 'all' && searchTerm === '' 
              ? "Vous n'avez pas encore créé de projet. Commencez par en créer un nouveau !" 
              : "Aucun projet ne correspond à ces critères."}
          </p>
          <Link to="/projects/new" className="btn-primary">
            <Icon name="" /> Créer un projet
          </Link>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3>{project.name}</h3>
                <span className={`project-status ${project.status?.toLowerCase() || 'active'}`}>
                  {project.status === 'ACTIVE' ? 'Actif' : 
                   project.status === 'COMPLETED' ? 'Terminé' : 
                   project.status === 'ARCHIVED' ? 'Archivé' : 'Actif'}
                </span>
              </div>
              <div className="project-card-body">
                <p className="project-description">{project.description || 'Aucune description'}</p>
                
                

                
              </div>
              <div className="project-card-footer">
                <Link to={`/projects/${project.id}`} className="btn-secondary">
                  <Icon name="" /> Voir
                </Link>
                <Link to={`/projects/${project.id}/edit`} className="btn-secondary">
                  <Icon name="" /> Modifier
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