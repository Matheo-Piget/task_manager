import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../../api/projectService';
import Icon from '../common/Icon';

const ProjectEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectById(id);
        
        // Format dates for input fields
        const formattedProject = {
          ...projectData,
          startDate: projectData.startDate ? new Date(projectData.startDate).toISOString().split('T')[0] : '',
          endDate: projectData.endDate ? new Date(projectData.endDate).toISOString().split('T')[0] : ''
        };
        
        setFormData(formattedProject);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement du projet");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validation simple
      if (!formData.name.trim()) {
        throw new Error('Le nom du projet est requis');
      }

      // Validation de date
      if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
        throw new Error('La date de fin doit être postérieure à la date de début');
      }

      await updateProject(id, formData);
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la mise à jour du projet');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du projet...</p>
      </div>
    );
  }

  return (
    <div className="project-edit-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <a href="/projects">Projets</a> / <a href={`/projects/${id}`}>{formData.name}</a> / <span>Modifier</span>
        </div>
        <h1>Modifier le projet</h1>
      </div>

      <div className="card">
        <div className="card-body">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom du projet*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Entrez le nom du projet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows="4"
                placeholder="Décrivez l'objectif et les détails du projet"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Date de début</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Date de fin prévue</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">Actif</option>
                <option value="COMPLETED">Terminé</option>
                <option value="ARCHIVED">Archivé</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(`/projects/${id}`)}
                className="btn-secondary"
              >
                <Icon name="x" /> Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditForm;