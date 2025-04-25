import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import AuthProvider from './context/AuthContext';
import AppRoutes from './components/routing/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Intercepteur d'erreurs global
  useEffect(() => {
    const handleGlobalError = (event) => {
      console.error('Global error caught:', event.error);
      // Vous pourriez ajouter une notification ici
    };

    window.addEventListener('error', handleGlobalError);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;