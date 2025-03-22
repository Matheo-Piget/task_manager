package com.taskmanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.model.User;
import com.taskmanager.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User registeredUser = authService.registerUser(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", registeredUser);
        response.put("token", "dummy-token"); // À remplacer par un vrai JWT
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        
        User user = authService.authenticateUser(username, password);
        
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", "dummy-token"); // À remplacer par un vrai JWT
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}