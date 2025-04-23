package com.edutrack.services;

import com.edutrack.entities.StudentSection;
import com.edutrack.repositories.StudentSectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentSectionService {

    @Autowired
    private StudentSectionRepository repository;

    public List<StudentSection> findAll() {
        return repository.findAll();
    }

    public Optional<StudentSection> findById(Long id) {
        return repository.findById(id);
    }

    public StudentSection save(StudentSection studentSection) {
        return repository.save(studentSection);
    }

    public StudentSection update(Long id, StudentSection updated) {
        return repository.findById(id)
                .map(existing -> {
                    updated.setId(id);
                    return repository.save(updated);
                })
                .orElseThrow(() -> new RuntimeException("No encontrado con id " + id));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("No existe el id " + id);
        }
        repository.deleteById(id);
    }
}
