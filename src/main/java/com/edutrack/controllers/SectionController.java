package com.edutrack.controllers;

import com.edutrack.entities.Section;
import com.edutrack.repositories.SectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sections")
public class SectionController {

    @Autowired
    private SectionRepository sectionRepository;

    // Obtener todas las secciones
    @GetMapping
    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    // Obtener una sección por ID
    @GetMapping("/{id}")
    public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
        Optional<Section> section = sectionRepository.findById(id);
        return section.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva sección
    @PostMapping
    public Section createSection(@RequestBody Section section) {
        return sectionRepository.save(section);
    }

    // Actualizar una sección existente
    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section sectionDetails) {
        return sectionRepository.findById(id).map(section -> {
            section.setTeacher(sectionDetails.getTeacher());
            section.setPeriod(sectionDetails.getPeriod());
            section.setCourse(sectionDetails.getCourse());
            section.setDate(sectionDetails.getDate());
            section.setStartTime(sectionDetails.getStartTime());
            section.setEndTime(sectionDetails.getEndTime());
            Section updatedSection = sectionRepository.save(section);
            return ResponseEntity.ok(updatedSection);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar una sección
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSection(@PathVariable Long id) {
        return sectionRepository.findById(id).map(section -> {
            sectionRepository.delete(section);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
