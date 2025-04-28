package com.taskmanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.model.Notification.NotificationType;
import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;

@Service
public class ReminderService {
 
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    // Vérifie toutes les heures les tâches qui arrivent à échéance
    @Scheduled(cron = "0 0 * * * *") // Toutes les heures
    @Transactional
    public void checkUpcomingTasks() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneDayLater = now.plusDays(1);
        
        // Récupérer les tâches qui sont dues dans les prochaines 24 heures
        List<Task> upcomingTasks = taskRepository.findByDueDateBetweenAndStatus(
            now, oneDayLater, Task.Status.TODO);
        
        for (Task task : upcomingTasks) {
            notificationService.createTaskNotification(
                task.getUser(),
                task,
                "Rappel de tâche",
                "La tâche \"" + task.getTitle() + "\" est due dans les prochaines 24 heures.",
                NotificationType.TASK_DUE_SOON
            );
        }
    }
    
    // Vérifie les tâches en retard une fois par jour
    @Scheduled(cron = "0 0 9 * * *") // Tous les jours à 9h
    @Transactional
    public void checkOverdueTasks() {
        LocalDateTime now = LocalDateTime.now();
        
        // Récupérer les tâches en retard qui n'ont pas encore de notification
        List<Task> overdueTasks = taskRepository.findOverdueTasksWithoutNotification(now);
        
        for (Task task : overdueTasks) {
            notificationService.createTaskNotification(
                task.getUser(),
                task,
                "Tâche en retard",
                "La tâche \"" + task.getTitle() + "\" est maintenant en retard.",
                NotificationType.TASK_OVERDUE
            );
        }
    }
}