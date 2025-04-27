import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Intégration future avec le backend
      // await resetPasswordRequest(email);
      setIsSubmitted(true);
    } catch (err) {
      setError("Impossible d'envoyer l'email de réinitialisation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <h1>Réinitialisation du mot de passe</h1>
          <div className="success-message">
            <p>Si un compte est associé à l'adresse {email}, un email de réinitialisation a été envoyé.</p>
          </div>
          <div className="form-actions">
            <Link to="/login" className="btn-primary">Retour à la connexion</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Mot de passe oublié</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre adresse email"
            />
            <div className="form-helper">
              Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary full-width" 
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </button>
        </form>
        
        <div className="login-links">
          <Link to="/login">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;