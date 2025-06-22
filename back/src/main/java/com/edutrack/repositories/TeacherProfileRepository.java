package com.edutrack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edutrack.entities.TeacherProfile;

@Repository
public interface TeacherProfileRepository extends JpaRepository<TeacherProfile, Long> {
    
    Optional<TeacherProfile> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    @Query("SELECT tp FROM TeacherProfile tp WHERE tp.user.institution.id = :institutionId")
    List<TeacherProfile> findByInstitutionId(Long institutionId);
}
