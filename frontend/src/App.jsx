import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import AuthProvider from './context/AuthContext'; // Changé ici
import Dashboard from './hooks/pages/DashBoard';
import Analytics from './hooks/pages/Analytics';
import Login from './hooks/pages/Login';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import Layout from './components/layout/Layout'; // Ajoutez cette ligne

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
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />

        <Route path="/tasks/new" element={
          <ProtectedRoute>
            <TaskForm />
          </ProtectedRoute>
        } />

        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskList /> 
          </ProtectedRoute>
        } />

        {/* Redirect to login for unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
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