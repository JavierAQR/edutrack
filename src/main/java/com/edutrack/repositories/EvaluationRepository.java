package com.edutrack.repositories;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findBySection(Section section);
}