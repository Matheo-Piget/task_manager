package com.taskmanager.repository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    
    @Query("SELECT DISTINCT t FROM Task t " +
           "LEFT JOIN FETCH t.project p " + 
           "LEFT JOIN FETCH t.user u " +
           "LEFT JOIN FETCH p.user " + 
           "WHERE t.user.id = :userId " +
           "ORDER BY t.dueDate ASC")
    List<Task> findByUserIdOrderByDueDateAsc(@Param("userId") Long userId);

    @Query(value = "SELECT status as ke, COUNT(*) as value FROM tasks WHERE user_id = :userId GROUP BY status", 
           nativeQuery = true)
    List<Object[]> getStatusDistributionRaw(@Param("userId") Long userId);
    
    default Map<String, Integer> getStatusDistribution(Long userId) {
        List<Object[]> results = getStatusDistributionRaw(userId);
        Map<String, Integer> distribution = new HashMap<>();
        
        // Par défaut, initialisez toutes les valeurs possibles à 0
        for (Task.Status status : Task.Status.values()) {
            distribution.put(status.name(), 0);
        }
        
        // Remplissez avec les valeurs réelles
        for (Object[] result : results) {
            String status = (String) result[0];
            Integer count = ((Number) result[1]).intValue();
            distribution.put(status, count);
        }
        
        return distribution;
    }

    List<Task> findByUserIdAndStatus(Long userId, Status status);

    List<Task> findByUserIdAndDueDateBefore(Long userId, LocalDateTime date);

    List<Task> findByUserIdAndProjectId(Long userId, Long projectId);

    @Query("SELECT t FROM Task t JOIN t.tags tag WHERE t.user.id = ?1 AND tag.id = ?2")
    List<Task> findByUserIdAndTagId(Long userId, Long tagId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = ?1 AND t.status = ?2")
    Long countByUserIdAndStatus(Long userId, Status status);

    Long countByUserId(Long userId);

    @Query(value = "SELECT priority as ke, COUNT(*) as value FROM tasks WHERE user_id = :userId GROUP BY priority", 
           nativeQuery = true)
    List<Object[]> getPriorityDistributionRaw(@Param("userId") Long userId);
    
    default Map<String, Integer> getPriorityDistribution(Long userId) {
        List<Object[]> results = getPriorityDistributionRaw(userId);
        Map<String, Integer> distribution = new HashMap<>();
        
        // Par défaut, initialisez toutes les valeurs possibles à 0
        for (Task.Priority priority : Task.Priority.values()) {
            distribution.put(priority.name(), 0);
        }
        
        // Remplissez avec les valeurs réelles
        for (Object[] result : results) {
            String priority = (String) result[0];
            if (priority != null) { // Gérer les priorités nulles
                Integer count = ((Number) result[1]).intValue();
                distribution.put(priority, count);
            }
        }
        
        return distribution;
    }

    Long countByUserIdAndDueDateBefore(Long userId, LocalDateTime date);
}