package com.edutrack.repositories;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.Section;
import com.edutrack.entities.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findBySection(Section section);

    @Query("SELECT e FROM Evaluation e JOIN e.section s JOIN s.studentSections ss WHERE ss.student = :student")
    List<Evaluation> findBySection_StudentSections_Student(@Param("student") StudentDetails student);

    @Query("SELECT e FROM Evaluation e WHERE e.section.id IN :sectionIds")
    List<Evaluation> findBySectionIdIn(@Param("sectionIds") List<Long> sectionIds);
}