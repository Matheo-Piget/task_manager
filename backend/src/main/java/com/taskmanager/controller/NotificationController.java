package com.taskmanager.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.Notification;
import com.taskmanager.security.UserAuthenticationToken;
import com.taskmanager.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<Page<Notification>> getNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        Pageable pageable = PageRequest.of(page, size);
        Page<Notification> notifications = notificationService.getNotificationsForUser(userId, pageable);
        
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(Authentication authentication) 
            throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        List<Notification> unreadNotifications = notificationService.getUnreadNotificationsForUser(userId);
        
        return ResponseEntity.ok(unreadNotifications);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getUnreadCount(Authentication authentication) 
            throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        long count = notificationService.getUnreadCount(userId);
        
        return ResponseEntity.ok(count);
    }
    
    @PostMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id, Authentication authentication) 
            throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        notificationService.markAsRead(id, userId);
        
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(Authentication authentication) 
            throws AccessDeniedException {
        
        Long userId = getUserIdFromAuthentication(authentication);
        notificationService.markAllAsRead(userId);
        
        return ResponseEntity.ok().build();
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) throws AccessDeniedException {
        if (authentication != null && authentication instanceof UserAuthenticationToken) {
            return ((UserAuthenticationToken) authentication).getUserId();
        }
        throw new AccessDeniedException("User not authenticated properly");
    }
}