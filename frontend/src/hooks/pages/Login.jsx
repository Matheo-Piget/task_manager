import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/loginService';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await loginUser({ username, password });
      
      login({
        ...response.user,
        token: response.token
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      
      // Messages d'erreur plus précis
      if (err.response) {
        if (err.response.status === 401) {
          setError('Nom d\'utilisateur ou mot de passe incorrect');
        } else if (err.response.status === 429) {
          setError('Trop de tentatives de connexion. Veuillez réessayer plus tard.');
        } else {
          setError(`Erreur: ${err.response.data?.message || 'Impossible de se connecter'}`);
        }
      } else if (err.request) {
        setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Connexion</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="login-links">
          <a href="/register">Créer un compte</a>
          <a href="/forgot-password">Mot de passe oublié?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;