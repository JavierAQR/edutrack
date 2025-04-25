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
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Teacher extends User {

    @ManyToOne
    @JoinColumn(name = "institution_id", nullable = true)
    private Institution institution = null;

    @Column(name = "professional_title")
    private String professionalTitle;

    private String speciality;
}
