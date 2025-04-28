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
import TaskEditForm from '../../components/tasks/TaskEditForm';
import TaskList from '../../components/tasks/TaskList';
import TaskDetail from '../../components/tasks/TaskDetail';
import Analytics from '../../hooks/pages/Analytics';
import NotFound from '../../hooks/pages/NotFound';
import UserProfile from '../../hooks/pages/UserProfile';
import ForgotPassword from '../../hooks/pages/ForgotPassword';
import Notification from '../../hooks/pages/Notification';

// Composants Projet
import ProjectList from '../projects/ProjectList';
import ProjectForm from '../projects/ProjectForm';
import ProjectDetail from '../projects/ProjectDetail';
import ProjectEditForm from '../projects/ProjectEditForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      // Ajoutez cette route après la route /register
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<HomePage />} />

      {/* Routes protégées avec layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <Layout>
            <Notification />
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

      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <UserProfile />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/tasks/:id/edit" element={
        <ProtectedRoute>
          <Layout>
            <TaskEditForm />
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

      <Route path="/projects" element={
        <ProtectedRoute>
          <Layout>
            <ProjectList />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/projects/new" element={
        <ProtectedRoute>
          <Layout>
            <ProjectForm />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/projects/:id" element={
        <ProtectedRoute>
          <Layout>
            <ProjectDetail />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/projects/:id/edit" element={
        <ProtectedRoute>
          <Layout>
            <ProjectEditForm />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;