package com.edutrack.services.impl;

import com.edutrack.entities.AcademicLevel;
import com.edutrack.repositories.AcademicLevelRepository;
import com.edutrack.services.AcademicLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcademicLevelServiceImpl implements AcademicLevelService {

    @Autowired
    private AcademicLevelRepository repository;

    @Override
    public List<AcademicLevel> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<AcademicLevel> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public AcademicLevel save(AcademicLevel academicLevel) {
        return repository.save(academicLevel);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}

