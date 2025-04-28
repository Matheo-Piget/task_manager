package com.taskmanager.controller;

import java.nio.file.AccessDeniedException;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Priority;
import com.taskmanager.model.Task.Status;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TagRepository;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.security.UserAuthenticationToken;
import com.taskmanager.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class AnalyticsController {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private TagRepository tagRepository;
    
    @Autowired
    private AnalyticsService analyticsService;

    /**
     * Récupère les tendances de complétion des tâches
     */
    @GetMapping("/completion-trends")
    public ResponseEntity<?> getCompletionTrends(
            @RequestParam(value = "period", defaultValue = "week") String period,
            Authentication authentication) throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        
        LocalDate startDate;
        LocalDate endDate = LocalDate.now();
        
        // Déterminer la période
        switch (period.toLowerCase()) {
            case "month":
                startDate = endDate.minusMonths(1);
                break;
            case "quarter":
                startDate = endDate.minusMonths(3);
                break;
            case "year":
                startDate = endDate.minusYears(1);
                break;
            case "week":
            default:
                startDate = endDate.minusWeeks(1);
                break;
        }
        
        List<Map<String, Object>> trends = analyticsService.getCompletionTrends(userId, startDate, endDate);
        
        return ResponseEntity.ok(trends);
    }

    /**
     * Récupère les métriques de productivité
     */
    @GetMapping("/productivity")
    public ResponseEntity<?> getProductivityMetrics(Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        
        Map<String, Object> metrics = analyticsService.getProductivityMetrics(userId);
        
        return ResponseEntity.ok(metrics);
    }

    /**
     * Récupère la distribution des tâches selon le type
     */
    @GetMapping("/distribution")
    public ResponseEntity<?> getTaskDistribution(
            @RequestParam(value = "type", defaultValue = "status") String type,
            Authentication authentication) throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        
        Map<String, Integer> distribution;
        
        switch (type.toLowerCase()) {
            case "priority":
                distribution = taskRepository.getPriorityDistribution(userId);
                break;
            case "project":
                distribution = analyticsService.getProjectDistribution(userId);
                break;
            case "status":
            default:
                distribution = taskRepository.getStatusDistribution(userId);
                break;
        }
        
        return ResponseEntity.ok(distribution);
    }

    /**
     * Récupère le taux de complétion par tags
     */
    @GetMapping("/tags/completion")
    public ResponseEntity<?> getCompletionRateByTags(Authentication authentication) throws AccessDeniedException {
        Long userId = getUserIdFromAuthentication(authentication);
        
        List<Map<String, Object>> tagCompletion = analyticsService.getTagCompletionRates(userId);
        
        return ResponseEntity.ok(tagCompletion);
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) throws AccessDeniedException {
        if (authentication != null && authentication instanceof UserAuthenticationToken) {
            return ((UserAuthenticationToken) authentication).getUserId();
        }
        throw new AccessDeniedException("User not authenticated properly");
    }
}