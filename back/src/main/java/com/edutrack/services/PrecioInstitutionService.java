package com.edutrack.services;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.edutrack.entities.PrecioInstitution;
import com.edutrack.entities.StudentProfile;
import com.edutrack.exception.ResourceNotFoundException;
import com.edutrack.repositories.PrecioInstitutionRepository;
import com.edutrack.repositories.StudentProfileRepository;

@Service
@RequiredArgsConstructor
public class PrecioInstitutionService {

     private final PrecioInstitutionRepository precioRepository;

    private final StudentProfileRepository studentRepository; // Inyectar repositorio de estudiantes

    
    public List<PrecioInstitution> getPreciosByStudent(Long studentId) {
        StudentProfile student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado"));
        
        if (student.getGrade() == null) {
            throw new IllegalStateException("El estudiante no tiene un grado asignado");
        }
        
        return precioRepository.findByInstitutionIdAndGradeId(
            student.getUser().getInstitution().getId(),
            student.getGrade().getId()
        );
    }
    
    public List<PrecioInstitution> getByInstitution(Long institutionId) {
        return precioRepository.findByInstitutionId(institutionId);
    }

    public PrecioInstitution create(PrecioInstitution precio) {
        return precioRepository.save(precio);
    }

    public void delete(Long id) {
        precioRepository.deleteById(id);
    }
}
