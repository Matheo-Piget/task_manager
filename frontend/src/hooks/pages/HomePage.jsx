import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomePage.css'; // Nous créerons ce fichier CSS par la suite

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <h1 className="logo">TaskManager</h1>
        </div>
        <nav className="home-nav">
          <Link to="/login" className="nav-button">Se connecter</Link>
          <Link to="/register" className="nav-button primary">S'inscrire</Link>
        </nav>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">Organisez votre travail,<br />simplifiez votre vie</h2>
            <p className="hero-subtitle">
              Une application intuitive pour gérer vos tâches, projets et priorités en un seul endroit.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Commencer gratuitement</Link>
              <Link to="/login" className="btn-secondary">Déjà inscrit ? Se connecter</Link>
            </div>
          </div>
          <div className="hero-image">
            {/* Vous pouvez ajouter une image ici */}
            <div className="placeholder-image">
              <div className="task-demo">
                <div className="task-card-demo">
                  <div className="task-status urgent"></div>
                  <h3>Présentation projet</h3>
                  <p>Préparer la présentation pour la réunion de lundi</p>
                </div>
                <div className="task-card-demo">
                  <div className="task-status medium"></div>
                  <h3>Mettre à jour le site</h3>
                  <p>Ajouter la nouvelle section produits</p>
                </div>
                <div className="task-card-demo">
                  <div className="task-status low"></div>
                  <h3>Répondre aux emails</h3>
                  <p>Traiter la boîte de réception</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Gestion des tâches</h3>
              <p>Créez, organisez et suivez vos tâches avec facilité.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Tableaux de bord analytiques</h3>
              <p>Visualisez votre progression et votre productivité.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Organisation par projets</h3>
              <p>Regroupez vos tâches par projets pour une meilleure organisation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Gestion des priorités</h3>
              <p>Définissez des priorités et des échéances pour rester concentré.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 TaskManager - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default HomePage;