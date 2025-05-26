package com.edutrack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher_details")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TeacherDetails {

    @Id
    private Long id;

    @OneToOne
    @MapsId  // Hace que este ID sea el mismo que userInstitution
    @JoinColumn(name = "user_institution_id")  // Columna que referencia a user_institution.id
    private UserInstitution userInstitution;

    @Column(name = "teacher_code", unique = true)
    private String teacherCode;


    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String specialization;
}
