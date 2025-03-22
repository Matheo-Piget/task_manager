package com.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.Project;
import com.taskmanager.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        // Utiliser un ID temporaire comme dans TaskController
        Long tempUserId = 1L;
        List<Project> projects = projectRepository.findByUserId(tempUserId);
        return ResponseEntity.ok(projects);
    }

    // Ajouter d'autres méthodes pour CRUD
}