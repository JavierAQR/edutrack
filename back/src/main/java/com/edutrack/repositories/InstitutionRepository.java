package com.edutrack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.Institution;
import com.edutrack.entities.InstitutionGrade;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    List<Institution> findByUserId(Long id);

    Optional<InstitutionGrade> findByUserId(String username);

}
