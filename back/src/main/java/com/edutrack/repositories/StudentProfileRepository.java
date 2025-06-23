package com.edutrack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edutrack.entities.StudentProfile;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long>{

    Optional<StudentProfile> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    @Query("SELECT tp FROM StudentProfile tp WHERE tp.user.institution.id = :institutionId")
    List<StudentProfile> findByInstitutionId(Long institutionId);
}
