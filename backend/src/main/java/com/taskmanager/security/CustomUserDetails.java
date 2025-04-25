package com.taskmanager.security;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

public interface CustomUserDetails {
    // Gardez les mêmes méthodes
    Collection<? extends GrantedAuthority> getAuthorities();
    String getPassword();
    String getUsername();
    boolean isAccountNonExpired();
    boolean isAccountNonLocked();
    boolean isCredentialsNonExpired();
    boolean isEnabled();
}