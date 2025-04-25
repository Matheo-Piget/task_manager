package com.taskmanager.security;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class UserAuthenticationToken extends UsernamePasswordAuthenticationToken {
    
    private static final long serialVersionUID = 1L;
    private Long userId;

    public UserAuthenticationToken(Object principal, Long userId, Object credentials,
            Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }
}