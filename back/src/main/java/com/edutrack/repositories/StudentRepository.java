package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.StudentDetails;

public interface StudentRepository extends JpaRepository<StudentDetails, Long> {
}
