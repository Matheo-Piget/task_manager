package com.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.model.Project;
import com.taskmanager.model.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
    }
    
    public Project getProjectByIdAndUserId(Long projectId, Long userId) {
        return projectRepository.findById(projectId)
                .filter(project -> project.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + projectId));
    }
    
    @Transactional
    public Project createProject(Project project, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        project.setUser(user);
        return projectRepository.save(project);
    }
    
    @Transactional
    public Project updateProject(Long projectId, Project projectDetails, Long userId) {
        Project project = getProjectByIdAndUserId(projectId, userId);
        
        project.setName(projectDetails.getName());
        project.setDescription(projectDetails.getDescription());
        
        return projectRepository.save(project);
    }
    
    @Transactional
    public void deleteProject(Long projectId, Long userId) {
        Project project = getProjectByIdAndUserId(projectId, userId);
        projectRepository.delete(project);
    }
}