package com.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.Tag;
import com.taskmanager.repository.TagRepository;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    
    @Autowired
    private TagRepository tagRepository;
    
    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        return ResponseEntity.ok(tags);
    }
    
    // Ajouter d'autres méthodes pour CRUD
}