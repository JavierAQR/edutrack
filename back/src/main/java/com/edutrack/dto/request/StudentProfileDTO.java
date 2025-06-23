package com.edutrack.dto.request;

import com.edutrack.entities.AcademicLevel;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDTO {

    @NotBlank(message = "El nivel académico es requerido.")
    private AcademicLevel academicLevel;
    
    private String biography;
}
