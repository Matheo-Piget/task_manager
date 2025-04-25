import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo-container">
                    <h1 className="logo">TaskManager</h1>
                </div>
            </header>
            
            <main className="home-main">
                <div className="card" style={{ maxWidth: '500px', margin: '5rem auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '4rem', color: 'var(--danger-color)', marginBottom: '1rem' }}>404</h1>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page introuvable</h2>
                    <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>
                        La page que vous recherchez n'existe pas ou a été déplacée.
                    </p>
                    <Link 
                        to="/" 
                        className="btn-primary"
                    >
                        Retourner à l'accueil
                    </Link>
                </div>
            </main>
            
            <footer className="home-footer">
                <p>&copy; 2025 TaskManager - Tous droits réservés</p>
            </footer>
        </div>
    );
};

export default NotFound;