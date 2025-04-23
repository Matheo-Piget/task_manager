import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import AuthProvider from './context/AuthContext';
import Dashboard from './hooks/pages/DashBoard';
import Analytics from './hooks/pages/Analytics';
import Login from './hooks/pages/Login';
import Register from './hooks/pages/Register';
import HomePage from './hooks/pages/HomePage';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import Layout from './components/layout/Layout';

// Styles
import './styles/App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Page d'accueil accessible à tous */}
      <Route path="/" element={<HomePage />} />
      
      {/* Pages d'authentification */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
      } />
      
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
      } />
      
      {/* Routes protégées avec layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute>
          <Layout>
            <Analytics />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/tasks/new" element={
        <ProtectedRoute>
          <Layout>
            <TaskForm />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/tasks" element={
        <ProtectedRoute>
          <Layout>
            <TaskList /> 
          </Layout>
        </ProtectedRoute>
      } />

      {/* Redirect to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;