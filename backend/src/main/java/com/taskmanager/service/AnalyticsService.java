package com.taskmanager.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.model.Project;
import com.taskmanager.model.Tag;
import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TagRepository;
import com.taskmanager.repository.TaskRepository;

@Service
public class AnalyticsService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private TagRepository tagRepository;

    /**
     * Récupère les tendances de complétion des tâches sur une période
     */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getCompletionTrends(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Task> tasks = taskRepository.findByUserIdOrderByDueDateAsc(userId);
        
        // Calculer le nombre de jours dans la période
        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        
        List<Map<String, Object>> trends = new ArrayList<>();
        
        // Pour chaque jour dans la période
        for (int i = 0; i < daysBetween; i++) {
            LocalDate currentDate = startDate.plusDays(i);
            LocalDateTime dayStart = currentDate.atStartOfDay();
            LocalDateTime dayEnd = currentDate.plusDays(1).atStartOfDay().minusNanos(1);
            
            // Compter les tâches ajoutées ce jour
            final LocalDateTime finalDayStart = dayStart;
            final LocalDateTime finalDayEnd = dayEnd;
            long tasksAdded = tasks.stream()
                    .filter(t -> t.getCreatedAt().isAfter(finalDayStart) && t.getCreatedAt().isBefore(finalDayEnd))
                    .count();
            
            // Compter les tâches complétées ce jour
            long tasksCompleted = tasks.stream()
                    .filter(t -> t.getStatus() == Status.DONE && t.getUpdatedAt().isAfter(finalDayStart) && t.getUpdatedAt().isBefore(finalDayEnd))
                    .count();
            
            Map<String, Object> dailyTrend = new HashMap<>();
            dailyTrend.put("date", currentDate.toString());
            dailyTrend.put("added", tasksAdded);
            dailyTrend.put("completed", tasksCompleted);
            
            trends.add(dailyTrend);
        }
        
        return trends;
    }

    /**
     * Récupère les métriques de productivité pour un utilisateur
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getProductivityMetrics(Long userId) {
        List<Task> tasks = taskRepository.findByUserIdOrderByDueDateAsc(userId);
        
        // Total des tâches
        long totalTasks = tasks.size();
        
        // Tâches terminées
        long completedTasks = tasks.stream()
                .filter(t -> t.getStatus() == Status.DONE)
                .count();
        
        // Taux de complétion
        double completionRate = totalTasks > 0 ? (double)completedTasks / totalTasks * 100 : 0;
        
        // Temps moyen de complétion (en jours)
        double avgCompletionTime = tasks.stream()
                .filter(t -> t.getStatus() == Status.DONE && t.getCreatedAt() != null && t.getUpdatedAt() != null)
                .mapToDouble(t -> ChronoUnit.DAYS.between(t.getCreatedAt(), t.getUpdatedAt()))
                .average()
                .orElse(0);
        
        // Tâches terminées cette semaine
        LocalDateTime weekStart = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();
        long tasksCompletedThisWeek = tasks.stream()
                .filter(t -> t.getStatus() == Status.DONE && t.getUpdatedAt().isAfter(weekStart))
                .count();
        
        // Tâches en retard
        LocalDateTime now = LocalDateTime.now();
        long overdueTasks = tasks.stream()
                .filter(t -> t.getStatus() != Status.DONE && t.getDueDate() != null && t.getDueDate().isBefore(now))
                .count();
        
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("completionRate", Math.round(completionRate * 10) / 10.0); // Arrondi à 1 décimale
        metrics.put("averageCompletionTime", Math.round(avgCompletionTime * 10) / 10.0);
        metrics.put("tasksCompletedThisWeek", tasksCompletedThisWeek);
        metrics.put("overdueTasks", overdueTasks);
        
        return metrics;
    }

    /**
     * Récupère la distribution des tâches par projet
     */
    @Transactional(readOnly = true)
    public Map<String, Integer> getProjectDistribution(Long userId) {
        List<Project> projects = projectRepository.findByUserId(userId);
        List<Task> tasks = taskRepository.findByUserIdOrderByDueDateAsc(userId);
        
        Map<String, Integer> distribution = new HashMap<>();
        
        // Initialiser tous les projets à 0
        for (Project project : projects) {
            distribution.put(project.getName(), 0);
        }
        
        // Distribution des tâches par projet
        for (Task task : tasks) {
            if (task.getProject() != null) {
                String projectName = task.getProject().getName();
                distribution.put(projectName, distribution.getOrDefault(projectName, 0) + 1);
            } else {
                // Gérer les tâches sans projet
                distribution.put("Sans projet", distribution.getOrDefault("Sans projet", 0) + 1);
            }
        }
        
        return distribution;
    }

    /**
     * Récupère le taux de complétion par tag
     */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getTagCompletionRates(Long userId) {
        List<Tag> tags = tagRepository.findAll();
        List<Task> tasks = taskRepository.findByUserIdOrderByDueDateAsc(userId);
        
        List<Map<String, Object>> tagCompletionRates = new ArrayList<>();
        
        for (Tag tag : tags) {
            // Compter toutes les tâches avec ce tag
            final Long tagId = tag.getId();
            List<Task> tasksWithTag = tasks.stream()
                    .filter(t -> t.getTags().stream().anyMatch(taskTag -> taskTag.getId().equals(tagId)))
                    .collect(Collectors.toList());
            
            // S'il n'y a pas de tâches avec ce tag, continuer
            if (tasksWithTag.isEmpty()) continue;
            
            // Compter les tâches terminées avec ce tag
            long completedTasksWithTag = tasksWithTag.stream()
                    .filter(t -> t.getStatus() == Status.DONE)
                    .count();
            
            // Calculer le taux de complétion
            double completionRate = (double)completedTasksWithTag / tasksWithTag.size() * 100;
            
            Map<String, Object> tagCompletion = new HashMap<>();
            tagCompletion.put("name", tag.getName());
            tagCompletion.put("completion", Math.round(completionRate));
            
            tagCompletionRates.add(tagCompletion);
        }
        
        return tagCompletionRates;
    }
}