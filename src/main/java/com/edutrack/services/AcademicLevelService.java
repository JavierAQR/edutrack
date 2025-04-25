package com.edutrack.services;

import com.edutrack.entities.AcademicLevel;

import java.util.List;
import java.util.Optional;

public interface AcademicLevelService {
    List<AcademicLevel> findAll();
    Optional<AcademicLevel> findById(Long id);
    AcademicLevel save(AcademicLevel academicLevel);
    void deleteById(Long id);
}

