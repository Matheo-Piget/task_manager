package com.taskmanager.controller;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.dto.TaskStatisticsDTO;
import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.security.UserAuthenticationToken;
import com.taskmanager.service.TaskService;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        Task task = taskService.getTaskByIdAndUserId(id, userId);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        Task createdTask = taskService.createTask(task, userId);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task,
            Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        Task updatedTask = taskService.updateTask(id, task, userId);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        taskService.deleteTask(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(
            @PathVariable Task.Status status,
            Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        List<Task> tasks = taskService.getTasksByUserIdAndStatus(userId, status);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/statistics")
    public ResponseEntity<TaskStatisticsDTO> getTaskStatistics(Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        TaskStatisticsDTO stats = taskService.getTaskStatistics(userId);
        return ResponseEntity.ok(stats);
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) throws AccessDeniedException {
        if (authentication != null && authentication instanceof UserAuthenticationToken) {
            return ((UserAuthenticationToken) authentication).getUserId();
        }
        
        // Instead of a hardcoded fallback, throw an appropriate exception
        throw new AccessDeniedException("Authentication required");
    }
}