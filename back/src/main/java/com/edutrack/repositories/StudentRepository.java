package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
