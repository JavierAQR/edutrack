package com.edutrack.dto.request;

import com.edutrack.entities.enums.UserType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateDTO {
    private String username;
    private String name;
    private String lastname;
    private UserType userType;
    // getters y setters
}
