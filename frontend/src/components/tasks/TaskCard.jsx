import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  if (!task) return null;
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'LOW': return 'priority-low';
      case 'MEDIUM': return 'priority-medium';
      case 'HIGH': return 'priority-high';
      case 'URGENT': return 'priority-urgent';
      default: return 'priority-medium';
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="task-card">
      <div className="task-card-content">
        <h3 className="task-title">{task.title}</h3>
        
        <p className="task-description">{task.description}</p>
        
        <div className="task-meta">
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority || 'MEDIUM'}
          </span>
          
          {task.dueDate && (
            <span className="task-due-date">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        
        <div className="task-actions">
          <Link to={`/tasks/${task.id}`} className="btn-secondary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;