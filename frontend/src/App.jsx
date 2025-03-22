import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Dashboard from './pages/DashBoard';
import Analytics from './pages/Analytics';
// Temporairement commentés car ils n'existent pas encore
// import TaskList from './pages/TaskList';
// import TaskDetail from './pages/TaskDetail';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import NotFound from './pages/NotFound';

// Components
// import Layout from './components/common/Layout';

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