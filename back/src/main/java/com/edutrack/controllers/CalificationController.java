package com.edutrack.controllers;

import com.edutrack.entities.Calification;
import com.edutrack.services.CalificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/califications")
public class CalificationController {

    @Autowired
    private CalificationService calificationService;

    @GetMapping
    public List<Calification> getAll() {
        return calificationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Calification> getById(@PathVariable Long id) {
        return calificationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Calification create(@RequestBody Calification calification) {
        return calificationService.save(calification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Calification> update(@PathVariable Long id, @RequestBody Calification calification) {
        return calificationService.findById(id)
                .map(existing -> {
                    calification.setId(id);
                    return ResponseEntity.ok(calificationService.save(calification));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (calificationService.findById(id).isPresent()) {
            calificationService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
