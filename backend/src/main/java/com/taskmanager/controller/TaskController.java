package com.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.model.Task;
import com.taskmanager.security.UserPrincipal;
import com.taskmanager.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Task> tasks = taskService.getTasksByUserId(userPrincipal.getId());
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Task task = taskService.getTaskByIdAndUserId(id, userPrincipal.getId());
        return ResponseEntity.ok(task);
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestBody Task task,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Task createdTask = taskService.createTask(task, userPrincipal.getId());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Task updatedTask = taskService.updateTask(id, task, userPrincipal.getId());
        return ResponseEntity.ok(updatedTask);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        taskService.deleteTask(id, userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(
            @PathVariable Task.Status status,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Task> tasks = taskService.getTasksByUserIdAndStatus(userPrincipal.getId(), status);
        return ResponseEntity.ok(tasks);
    }
}