package com.taskmanager.dto;

import java.time.LocalDateTime;

public interface TaskProjection {
    Long getId();
    String getTitle();
    String getDescription();
    LocalDateTime getDueDate();
    
    ProjectProjection getProject();
    
    interface ProjectProjection {
        Long getId();
        String getName();
    }
}