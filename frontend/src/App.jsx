import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/DashBoard';
import Analytics from './pages/Analytics';

// Styles
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Pour le moment, accès direct aux pages sans authentification */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          
          {/* Rediriger vers la page d'accueil pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;