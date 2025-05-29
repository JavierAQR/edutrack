package com.edutrack.repositories;

import com.edutrack.entities.Section;
import com.edutrack.entities.StudentDetails;
import com.edutrack.entities.StudentSection;
import com.edutrack.entities.UserInstitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentSectionRepository extends JpaRepository<StudentSection, Long> {

    @Query("SELECT ss FROM StudentSection ss WHERE ss.student.userInstitution = :userInstitution")
    List<StudentSection> findByUserInstitution(@Param("userInstitution") UserInstitution userInstitution);

    // Métodos existentes
    List<StudentSection> findByStudent(StudentDetails student);
    Optional<StudentSection> findByStudentAndSection(StudentDetails student, Section section);
}