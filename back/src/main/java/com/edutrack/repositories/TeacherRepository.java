package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.TeacherDetails;

public interface TeacherRepository extends JpaRepository<TeacherDetails, Long> {
    
}
