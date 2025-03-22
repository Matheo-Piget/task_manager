package com.taskmanager.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public interface UserDetails {
    
    /**
     * Renvoie les autorisations accordées à l'utilisateur
     * @return une collection d'autorisations
     */
    Collection<? extends GrantedAuthority> getAuthorities();
    
    /**
     * Renvoie le mot de passe utilisé pour authentifier l'utilisateur
     * @return le mot de passe
     */
    String getPassword();
    
    /**
     * Renvoie le nom d'utilisateur utilisé pour authentifier l'utilisateur
     * @return le nom d'utilisateur
     */
    String getUsername();
    
    /**
     * Indique si le compte utilisateur a expiré
     * @return true si le compte est valide (non expiré), false sinon
     */
    boolean isAccountNonExpired();
    
    /**
     * Indique si l'utilisateur est verrouillé ou déverrouillé
     * @return true si l'utilisateur n'est pas verrouillé, false sinon
     */
    boolean isAccountNonLocked();
    
    /**
     * Indique si les identifiants de l'utilisateur (mot de passe) ont expiré
     * @return true si les identifiants sont valides (non expirés), false sinon
     */
    boolean isCredentialsNonExpired();
    
    /**
     * Indique si l'utilisateur est activé ou désactivé
     * @return true si l'utilisateur est activé, false sinon
     */
    boolean isEnabled();
}