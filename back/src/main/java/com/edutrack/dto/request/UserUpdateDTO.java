package com.edutrack.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateDTO {
    @NotBlank
    private String name;
    
    @NotBlank
    private String lastname;

    
}
