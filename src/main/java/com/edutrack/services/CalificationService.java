package com.edutrack.services;

import com.edutrack.entities.Calification;
import com.edutrack.repositories.CalificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalificationService {

    @Autowired
    private CalificationRepository calificationRepository;

    public List<Calification> findAll() {
        return calificationRepository.findAll();
    }

    public Optional<Calification> findById(Long id) {
        return calificationRepository.findById(id);
    }

    public Calification save(Calification calification) {
        return calificationRepository.save(calification);
    }

    public void deleteById(Long id) {
        calificationRepository.deleteById(id);
    }
}
