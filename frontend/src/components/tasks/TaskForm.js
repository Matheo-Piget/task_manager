import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createTask, updateTask, getTaskById } from '../../api/taskService';
import { getProjects } from '../../api/projectService';
import { getTags } from '../../api/tagService';

const TaskForm = ({ taskId, onSuccess }) => {
  const history = useHistory();
  const isEditMode = !!taskId;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'TODO',
    projectId: '',
    tags: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects and tags for dropdowns
        const [projectsData, tagsData] = await Promise.all([
          getProjects(),
          getTags()
        ]);
        
        setProjects(projectsData);
        setAvailableTags(tagsData);
        
        // If in edit mode, fetch the task data
        if (isEditMode) {
          const taskData = await getTaskById(taskId);
          
          // Format due date for input
          let formattedDueDate = '';
          if (taskData.dueDate) {
            formattedDueDate = new Date(taskData.dueDate)
              .toISOString()
              .substring(0, 16);
          }
          
          setFormData({
            title: taskData.title || '',
            description: taskData.description || '',
            dueDate: formattedDueDate,
            priority: taskData.priority || 'MEDIUM',
            status: taskData.status || 'TODO',
            projectId: taskData.project?.id || '',
            tags: taskData.tags?.map(tag => tag.id) || []
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchData();
  }, [taskId, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, tags: selectedOptions }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Prepare data for API
      const taskData = {
        ...formData,
        project: formData.projectId ? { id: formData.projectId } : null,
        tags: formData.tags.map(tagId => ({ id: tagId }))
      };
      
      // Remove projectId which is not part of the Task model
      delete taskData.projectId;
      
      let result;
      if (isEditMode) {
        result = await updateTask(taskId, taskData);
      } else {
        result = await createTask(taskData);
      }
      
      setLoading(false);
      
      if (onSuccess) {
        onSuccess(result);
      } else {
        history.push('/tasks');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  
  return (
    <div className="task-form">
      <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="projectId">Project</label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            <option value="">None</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <select
            id="tags"
            name="tags"
            multiple
            value={formData.tags}
            onChange={handleTagsChange}
          >
            {availableTags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <small>Hold Ctrl (or Cmd) to select multiple tags</small>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;