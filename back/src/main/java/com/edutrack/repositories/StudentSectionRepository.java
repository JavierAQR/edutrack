package com.edutrack.repositories;

import com.edutrack.entities.StudentDetails;
import com.edutrack.entities.StudentSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentSectionRepository extends JpaRepository<StudentSection, Long> {
    List<StudentSection> findByStudent(StudentDetails student);
}
