package com.taskmanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserIdOrderByDueDateAsc(userId);
    }
    
    public Task getTaskByIdAndUserId(Long taskId, Long userId) {
        return taskRepository.findById(taskId)
                .filter(task -> task.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + taskId));
    }
    
    @Transactional
    public Task createTask(Task task, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        task.setUser(user);
        return taskRepository.save(task);
    }
    
    @Transactional
    public Task updateTask(Long taskId, Task taskDetails, Long userId) {
        Task task = getTaskByIdAndUserId(taskId, userId);
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setPriority(taskDetails.getPriority());
        task.setStatus(taskDetails.getStatus());
        task.setProject(taskDetails.getProject());
        
        return taskRepository.save(task);
    }
    
    @Transactional
    public void deleteTask(Long taskId, Long userId) {
        Task task = getTaskByIdAndUserId(taskId, userId);
        taskRepository.delete(task);
    }
    
    public List<Task> getTasksByUserIdAndStatus(Long userId, Status status) {
        return taskRepository.findByUserIdAndStatus(userId, status);
    }
    
    public List<Task> getOverdueTasks(Long userId) {
        return taskRepository.findByUserIdAndDueDateBefore(userId, LocalDateTime.now());
    }
    
    public Long countTasksByStatus(Long userId, Status status) {
        return taskRepository.countByUserIdAndStatus(userId, status);
    }
}