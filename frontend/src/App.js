// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

// Pages
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/common/Layout';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
          <PrivateRoute path="/">
            <Layout>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/tasks" component={TaskList} />
                <Route path="/tasks/:id" component={TaskDetail} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/profile" component={Profile} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </Layout>
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;