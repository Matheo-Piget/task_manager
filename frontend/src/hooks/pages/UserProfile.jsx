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
    bio: '',
    jobTitle: '',
    location: '',
    themePreference: 'dark',
    notificationsEnabled: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        bio: user.bio || "Passionné(e) par l'organisation et l'efficacité",
        jobTitle: user.jobTitle || 'Utilisateur TaskManager',
        location: user.location || 'France',
        themePreference: user.themePreference || 'dark',
        notificationsEnabled: user.notificationsEnabled !== false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulation de mise à jour
      await new Promise(resolve => setTimeout(resolve, 1000));
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
        <h1><Icon name="user" size="1.2em" /> Mon Profil</h1>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-avatar-large">
            <div className="avatar-image">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <button className="avatar-edit-button">
              <Icon name="camera" />
            </button>
          </div>
          
          <div className="profile-nav">
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="user" /> Informations
            </button>
            <button 
              className={activeTab === 'security' ? 'active' : ''}
              onClick={() => setActiveTab('security')}
            >
              <Icon name="settings" /> Sécurité
            </button>
            <button 
              className={activeTab === 'preferences' ? 'active' : ''}
              onClick={() => setActiveTab('preferences')}
            >
              <Icon name="sliders" /> Préférences
            </button>
            <button 
              className={activeTab === 'activity' ? 'active' : ''}
              onClick={() => setActiveTab('activity')}
            >
              <Icon name="activity" /> Activité
            </button>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Tâches</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">Projets</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Terminés</div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          {message.text && (
            <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} slide-up`}>
              <Icon name={message.type === 'error' ? 'alert-circle' : 'check-circle'} />
              {message.text}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card profile-card fade-in">
              <div className="card-header">
                <h2>Informations personnelles</h2>
                {!isEditing ? (
                  <button className="btn-icon" onClick={() => setIsEditing(true)}>
                    <Icon name="edit-2" />
                  </button>
                ) : null}
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">
                      <Icon name="user" /> Nom complet
                    </label>
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
                    <label htmlFor="email">
                      <Icon name="mail" /> Email
                    </label>
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
                  
                  <div className="form-group">
                    <label htmlFor="bio">
                      <Icon name="file-text" /> Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className={!isEditing ? 'input-disabled' : ''}
                    ></textarea>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="jobTitle">
                        <Icon name="briefcase" /> Profession
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'input-disabled' : ''}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location">
                        <Icon name="map-pin" /> Localisation
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'input-disabled' : ''}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        <Icon name="x" /> Annuler
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="loading-spinner-small"></span>
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <Icon name="check" /> Enregistrer
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card security-card fade-in">
              <div className="card-header">
                <h2>Sécurité du compte</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="password">
                      <Icon name="lock" /> Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">
                      <Icon name="key" /> Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <Icon name="check-circle" /> Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setActiveTab('profile')}
                    >
                      <Icon name="arrow-left" /> Retour
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      <Icon name="save" /> Mettre à jour le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card preferences-card fade-in">
              <div className="card-header">
                <h2>Préférences</h2>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="themePreference">
                      <Icon name="moon" /> Thème
                    </label>
                    <select
                      id="themePreference"
                      name="themePreference"
                      value={formData.themePreference}
                      onChange={handleChange}
                    >
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                      <option value="system">Système</option>
                    </select>
                  </div>
                  
                  <div className="toggle-group">
                    <label>
                      <Icon name="bell" /> Notifications
                    </label>
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        id="notificationsEnabled"
                        name="notificationsEnabled"
                        checked={formData.notificationsEnabled}
                        onChange={handleChange}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        setMessage({ type: 'success', text: 'Préférences enregistrées !' });
                        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
                      }}
                    >
                      <Icon name="save" /> Enregistrer les préférences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="card activity-card fade-in">
              <div className="card-header">
                <h2>Activité récente</h2>
              </div>
              <div className="card-body">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Icon name="check-square" />
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-date">Aujourd'hui, 10:25</p>
                      <h3>Tâche complétée</h3>
                      <p>Vous avez terminé la tâche "Mise à jour du dashboard"</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Icon name="plus" />
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-date">Hier, 15:30</p>
                      <h3>Nouvelle tâche</h3>
                      <p>Vous avez créé une nouvelle tâche "Préparer la présentation"</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Icon name="user" />
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-date">23 Apr 2025, 09:15</p>
                      <h3>Profil mis à jour</h3>
                      <p>Vous avez modifié vos informations personnelles</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Icon name="folder" />
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-date">21 Apr 2025, 14:05</p>
                      <h3>Nouveau projet</h3>
                      <p>Vous avez créé un nouveau projet "Refonte du site web"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;