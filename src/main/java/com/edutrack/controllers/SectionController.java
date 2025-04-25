package com.edutrack.controllers;

import com.edutrack.entities.Section;
import com.edutrack.services.SectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {

    @Autowired
    private SectionService sectionService;

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
        return sectionService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Section createSection(@RequestBody Section section) {
        return sectionService.save(section);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section sectionDetails) {
        try {
            Section updated = sectionService.update(id, sectionDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSection(@PathVariable Long id) {
        sectionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
