package com.edutrack.auth;

import java.time.LocalDate;

public record AuthRequestDTO(
    String name,
    String lastname,
    String username,
    String password,
    String email,
    LocalDate birthdate
) {
    
}
