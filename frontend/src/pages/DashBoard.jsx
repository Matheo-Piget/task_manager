// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, getTaskStatistics } from '../api/taskService';
import TaskCard from '../components/tasks/TaskCard';
import StatCard from '../components/dashboard/StatCard';
import PriorityChart from '../components/dashboard/Priority';
import StatusChart from '../components/dashboard/StatusChart';

const Dashboard = () => {
  const [recentTasks, setRecentTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    upcomingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {setLoading(true);
        // Fetch recent tasks
        const tasksResponse = await getTasks();
        setRecentTasks(tasksResponse);
        
        // Fetch statistics
        const statsResponse = await getTaskStatistics();
        setStats(statsResponse);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon="clipboard"
          color="blue"
        />
        <StatCard
          title="Completed"
          value={stats.completedTasks}
          percentage={stats.totalTasks ? (stats.completedTasks / stats.totalTasks) * 100 : 0}
          icon="check-circle"
          color="green"
        />
        <StatCard
          title="Overdue"
          value={stats.overdueTasks}
          icon="alert-circle"
          color="red"
        />
        <StatCard
          title="Upcoming"
          value={stats.upcomingTasks}
          icon="calendar"
          color="purple"
        />
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Tasks by Status</h3>
          <StatusChart data={stats.statusDistribution} />
        </div>
        <div className="chart-card">
          <h3>Tasks by Priority</h3>
          <PriorityChart data={stats.priorityDistribution} />
        </div>
      </div>
      
      <div className="recent-tasks">
        <div className="section-header">
          <h2>Recent Tasks</h2>
          <Link to="/tasks" className="view-all">View All</Link>
        </div>
        
        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any tasks yet.</p>
            <Link to="/tasks/new" className="btn-primary">Create Your First Task</Link>
          </div>
        ) : (
          <div className="tasks-grid">
            {recentTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;