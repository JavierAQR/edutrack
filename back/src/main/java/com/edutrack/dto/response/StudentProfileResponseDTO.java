package com.edutrack.dto.response;

import com.edutrack.entities.AcademicLevel;
import com.edutrack.entities.StudentProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileResponseDTO {
    private Long id;
    private AcademicLevel academicLevel;
    private String biography;

    public StudentProfileResponseDTO(StudentProfile studentProfile) {
        this.id = studentProfile.getId();
        this.academicLevel = studentProfile.getAcademicLevel();
        this.biography = studentProfile.getBiography();

    }
}
