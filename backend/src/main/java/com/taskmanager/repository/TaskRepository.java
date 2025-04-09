package com.taskmanager.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.taskmanager.model.Task;
import com.taskmanager.model.Task.Status;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdOrderByDueDateAsc(Long userId);

    List<Task> findByUserIdAndStatus(Long userId, Status status);

    List<Task> findByUserIdAndDueDateBefore(Long userId, LocalDateTime date);

    List<Task> findByUserIdAndProjectId(Long userId, Long projectId);

    @Query("SELECT t FROM Task t JOIN t.tags tag WHERE t.user.id = ?1 AND tag.id = ?2")
    List<Task> findByUserIdAndTagId(Long userId, Long tagId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = ?1 AND t.status = ?2")
    Long countByUserIdAndStatus(Long userId, Status status);

    Long countByUserId(Long userId);

    Long countByUserIdAndDueDateBefore(Long userId, LocalDateTime date);
}