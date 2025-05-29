package com.edutrack.repositories;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.Section;
import com.edutrack.entities.TeacherDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    @Query("SELECT e FROM Evaluation e " +
            "WHERE e.section IN " +
            "(SELECT ss.section FROM StudentSection ss WHERE ss.student.id = :studentId) " +
            "AND e.date >= :currentDate")
    List<Evaluation> findPendingEvaluationsForStudent(@Param("studentId") Long studentId,
                                                      @Param("currentDate") LocalDate currentDate);

    List<Evaluation> findBySectionTeacherAndDateGreaterThanEqual(TeacherDetails teacher, LocalDate date);

    List<Evaluation> findBySection(Section section);

    List<Evaluation> findBySectionIn(List<Section> collect);
}