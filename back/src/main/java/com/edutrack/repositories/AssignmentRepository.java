package com.edutrack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySectionId(Long sectionId);
}
