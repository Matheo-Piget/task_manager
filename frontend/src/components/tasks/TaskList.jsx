import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../../api/taskService';
import TaskCard from './TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = filter === 'ALL' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="task-list-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <Link to="/tasks/new" className="btn-primary">
          Create New Task
        </Link>
      </div>

      <div className="task-filters">
        <button 
          onClick={() => setFilter('ALL')}
          className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('TODO')}
          className={`filter-btn ${filter === 'TODO' ? 'active' : ''}`}
        >
          To Do
        </button>
        <button 
          onClick={() => setFilter('IN_PROGRESS')}
          className={`filter-btn ${filter === 'IN_PROGRESS' ? 'active' : ''}`}
        >
          In Progress
        </button>
        <button 
          onClick={() => setFilter('DONE')}
          className={`filter-btn ${filter === 'DONE' ? 'active' : ''}`}
        >
          Done
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found.</p>
          <Link to="/tasks/new" className="btn-primary">Create Task</Link>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;