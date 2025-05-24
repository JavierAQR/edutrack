package com.edutrack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Student extends User {

    @ManyToOne
    @JoinColumn(name = "institution_id", nullable = true)
    private Institution institution = null;
    
    @ManyToOne
    @JoinColumn(name = "academic_level_id", nullable = true)
    private AcademicLevel academicLevel;

    @Column(name = "average_grade")
    private Double averageGrade;
}
