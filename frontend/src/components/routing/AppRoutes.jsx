import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import Layout from '../layout/Layout';

// Pages
import Login from '../../hooks/pages/Login';
import Register from '../../hooks/pages/Register';
import HomePage from '../../hooks/pages/HomePage';
import Dashboard from '../../hooks/pages/DashBoard';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';
import TaskDetail from '../../components/tasks/TaskDetail';
import Analytics from '../../hooks/pages/Analytics';
import NotFound from '../../hooks/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      
      {/* Routes protégées avec layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
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
      
      <Route path="/tasks/new" element={
        <ProtectedRoute>
          <Layout>
            <TaskForm />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/tasks/:id/edit" element={
        <ProtectedRoute>
          <Layout>
            <TaskForm />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/tasks/:id" element={
        <ProtectedRoute>
          <Layout>
            <TaskDetail />
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
      
      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;