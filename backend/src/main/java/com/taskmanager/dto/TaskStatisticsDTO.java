package com.taskmanager.dto;

import java.util.Map;

import lombok.Data;

@Data
public class TaskStatisticsDTO {
    private Long totalTasks;
    private Long completedTasks;
    private Long overdueTasks;
    private Long upcomingTasks;
    private Map<String, Integer> statusDistribution;
    private Map<String, Integer> priorityDistribution;
}