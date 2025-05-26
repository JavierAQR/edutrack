package com.edutrack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDetails {

    @Id
    private Long id;

    @OneToOne
    @MapsId  // Hace que el id sea compartido con UserInstitution
    @JoinColumn(name = "user_institution_id")  // Columna que referencia a user_institution.id
    private UserInstitution userInstitution;

    @Column(name = "student_code", unique = true)
    private String studentCode;
    
    @ManyToOne
    @JoinColumn(name = "academic_level_id", nullable = false)
    private AcademicLevel academicLevel;

    @Column(name = "average_grade", nullable =  true)
    private Double averageGrade;
}
