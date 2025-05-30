package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edutrack.entities.Calification;
import org.springframework.stereotype.Repository;
import com.edutrack.entities.StudentDetails;
import java.util.List;

@Repository
public interface CalificationRepository extends JpaRepository<Calification, Long> {
    List<Calification> findByStudent(StudentDetails student);
}
