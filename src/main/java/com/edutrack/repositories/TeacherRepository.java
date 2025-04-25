package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    
}
