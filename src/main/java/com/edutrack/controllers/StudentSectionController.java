package com.edutrack.controllers;

import com.edutrack.entities.StudentSection;
import com.edutrack.repositories.StudentSectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student-sections")
public class StudentSectionController {

    @Autowired
    private StudentSectionRepository studentSectionRepository;

    // GET todos
    @GetMapping
    public List<StudentSection> getAll() {
        return studentSectionRepository.findAll();
    }

    // GET por id
    @GetMapping("/{id}")
    public ResponseEntity<StudentSection> getById(@PathVariable Long id) {
        Optional<StudentSection> optional = studentSectionRepository.findById(id);
        return optional.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST crear
    @PostMapping
    public StudentSection create(@RequestBody StudentSection studentSection) {
        return studentSectionRepository.save(studentSection);
    }

    // PUT actualizar
    @PutMapping("/{id}")
    public ResponseEntity<StudentSection> update(@PathVariable Long id, @RequestBody StudentSection updatedSection) {
        return studentSectionRepository.findById(id).map(existing -> {
            updatedSection.setId(id);
            return ResponseEntity.ok(studentSectionRepository.save(updatedSection));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (studentSectionRepository.existsById(id)) {
            studentSectionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
