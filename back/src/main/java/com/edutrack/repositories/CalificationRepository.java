package com.edutrack.repositories;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edutrack.entities.Calification;
import org.springframework.stereotype.Repository;

@Repository
public interface CalificationRepository extends JpaRepository<Calification, Long> {

    boolean existsByEvaluationAndStudent(Evaluation evaluation, StudentDetails student);
}
