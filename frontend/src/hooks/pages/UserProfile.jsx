import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Icon from '../../components/common/Icon';

const UserProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation du formulaire
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simuler la mise à jour du profil
      // En production, remplacez par un vrai appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour simulée
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Une erreur est survenue' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Mon Profil</h1>
      </div>

      <div className="card profile-card">
        <div className="card-body">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <button className="avatar-edit-button">
                <Icon name="camera" />
              </button>
            </div>
            <div className="profile-info">
              <h2>{user?.fullName || 'Utilisateur'}</h2>
              <p className="text-muted">{user?.email || 'email@exemple.com'}</p>
              <div className="account-status">
                <span className="status-dot active"></span>
                Compte actif
              </div>
            </div>
          </div>

          {message.text && (
            <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Informations personnelles</h3>
              <div className="form-group">
                <label htmlFor="fullName">Nom complet</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'input-disabled' : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'input-disabled' : ''}
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-section">
                <h3>Changer votre mot de passe</h3>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe actuel</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <Icon name="edit-2" /> Modifier le profil
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer les changements'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card account-card">
        <div className="card-header">
          <h3>Informations du compte</h3>
        </div>
        <div className="card-body">
          <div className="info-item">
            <div className="info-label">
              <Icon name="calendar" /> Date d'inscription
            </div>
            <div className="info-value">
              {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">
              <Icon name="check-circle" /> Statut du compte
            </div>
            <div className="info-value">
              <span className="badge badge-success">Actif</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">
              <Icon name="layout" /> Tâches créées
            </div>
            <div className="info-value">
              12
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">
              <Icon name="check-square" /> Tâches complétées
            </div>
            <div className="info-value">
              8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;