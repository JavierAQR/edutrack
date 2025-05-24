package com.edutrack.controllers;

import com.edutrack.entities.AcademicLevel;
import com.edutrack.services.AcademicLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/levels")
public class AcademicLevelController {

    @Autowired
    private AcademicLevelService service;

    @GetMapping
    public List<AcademicLevel> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicLevel> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AcademicLevel create(@RequestBody AcademicLevel academicLevel) {
        return service.save(academicLevel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicLevel> update(@PathVariable Long id, @RequestBody AcademicLevel academicLevel) {
        return service.findById(id)
                .map(existing -> {
                    academicLevel.setId(id);
                    return ResponseEntity.ok(service.save(academicLevel));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
