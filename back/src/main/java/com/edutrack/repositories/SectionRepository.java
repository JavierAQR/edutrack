package com.edutrack.repositories;

import com.edutrack.entities.Section;
import com.edutrack.entities.TeacherDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findByTeacher(TeacherDetails teacher);
}
