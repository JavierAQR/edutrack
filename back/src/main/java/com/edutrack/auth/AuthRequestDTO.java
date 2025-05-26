package com.edutrack.auth;

public record AuthRequestDTO(
    String name,
    String lastname,
    String username,
    String password,
    String email
) {
    
}
