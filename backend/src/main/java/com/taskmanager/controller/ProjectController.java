package com.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.Project;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.security.UserPrincipal;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @GetMapping
    public ResponseEntity<List<Project>> getProjects(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Project> projects = projectRepository.findByUserId(userPrincipal.getId());
        return ResponseEntity.ok(projects);
    }
    
    // Ajouter d'autres méthodes pour CRUD
}