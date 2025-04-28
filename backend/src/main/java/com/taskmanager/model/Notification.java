package com.taskmanager.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "notifications")
@Data
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String message;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;
    
    @Column(nullable = false)
    private boolean read = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    // Référence optionnelle vers une tâche concernée
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
    
    // Référence optionnelle vers un projet concerné
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum NotificationType {
        TASK_DUE_SOON, // Tâche bientôt due
        TASK_OVERDUE,  // Tâche en retard
        TASK_ASSIGNED, // Tâche assignée
        TASK_COMPLETED, // Tâche terminée
        PROJECT_UPDATE, // Mise à jour projet
        SYSTEM_MESSAGE // Message système
    }
}