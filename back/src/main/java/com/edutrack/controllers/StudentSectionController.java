package com.edutrack.controllers;

import com.edutrack.entities.StudentSection;
import com.edutrack.services.StudentSectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-sections")
public class StudentSectionController {

    @Autowired
    private StudentSectionService service;

    @GetMapping
    public List<StudentSection> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentSection> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public StudentSection create(@RequestBody StudentSection studentSection) {
        return service.save(studentSection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentSection> update(@PathVariable Long id, @RequestBody StudentSection updatedSection) {
        try {
            StudentSection updated = service.update(id, updatedSection);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
