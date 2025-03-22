package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    // Méthodes personnalisées si nécessaires
}