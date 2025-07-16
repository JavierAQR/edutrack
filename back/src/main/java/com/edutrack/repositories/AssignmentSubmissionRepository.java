package com.edutrack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.AssignmentSubmission;

public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {
    List<AssignmentSubmission> findByAssignmentId(Long assignmentId);
    Optional<AssignmentSubmission> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
}
