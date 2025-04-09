package com.taskmanager.controller;

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

import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // Permet les requêtes depuis le frontend
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private TaskRepository taskRepository;

    // ID utilisateur temporaire pour le développement
    private static final Long TEMP_USER_ID = 1L; // Correspond à votre utilisateur 'admin'

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getTasksByUserId(TEMP_USER_ID);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskByIdAndUserId(id, TEMP_USER_ID);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task, TEMP_USER_ID);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task, TEMP_USER_ID);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id, TEMP_USER_ID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable Task.Status status) {
        List<Task> tasks = taskService.getTasksByUserIdAndStatus(TEMP_USER_ID, status);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getTaskStatistics() {
        // Créer des statistiques basiques pour l'utilisateur temporaire
        Map<String, Object> statistics = new HashMap<>();

        // Compter les tâches par statut
        Long totalTasks = taskRepository.countByUserId(TEMP_USER_ID);
        Long completedTasks = taskService.countTasksByStatus(TEMP_USER_ID, Status.DONE);
        Long overdueTasks = taskRepository.countByUserIdAndDueDateBefore(
                TEMP_USER_ID,
                LocalDateTime.now());

        // Créer des distributions fictives
        Map<String, Integer> statusDistribution = new HashMap<>();
        statusDistribution.put("TODO", 3);
        statusDistribution.put("IN_PROGRESS", 2);
        statusDistribution.put("DONE", completedTasks.intValue());
        statusDistribution.put("ARCHIVED", 1);

        Map<String, Integer> priorityDistribution = new HashMap<>();
        priorityDistribution.put("LOW", 2);
        priorityDistribution.put("MEDIUM", 3);
        priorityDistribution.put("HIGH", 2);
        priorityDistribution.put("URGENT", 1);

        // Remplir les statistiques
        statistics.put("totalTasks", totalTasks);
        statistics.put("completedTasks", completedTasks);
        statistics.put("overdueTasks", overdueTasks);
        statistics.put("upcomingTasks", 2); // Valeur fictive
        statistics.put("statusDistribution", statusDistribution);
        statistics.put("priorityDistribution", priorityDistribution);

        return ResponseEntity.ok(statistics);
    }
}