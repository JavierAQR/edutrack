package com.edutrack.controllers;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.Section;
import com.edutrack.services.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    // Crear evaluación
    @PostMapping
    public ResponseEntity<Evaluation> createEvaluation(@RequestBody Evaluation evaluation) {
        Evaluation savedEvaluation = evaluationService.createEvaluation(evaluation);
        return ResponseEntity.ok(savedEvaluation);
    }

    // Listar evaluaciones por sección
    @GetMapping("/section/{sectionId}")
    public ResponseEntity<List<Evaluation>> getEvaluationsBySection(@PathVariable Long sectionId) {
        Section section = new Section();
        section.setId(sectionId);
        List<Evaluation> evaluations = evaluationService.getEvaluationsBySection(section);
        return ResponseEntity.ok(evaluations);
    }

    // Actualizar evaluación
    @PutMapping("/{id}")
    public ResponseEntity<Evaluation> updateEvaluation(
            @PathVariable Long id,
            @RequestBody Evaluation updatedEvaluation) {
        Evaluation evaluation = evaluationService.updateEvaluation(id, updatedEvaluation);
        return ResponseEntity.ok(evaluation);
    }

    // Eliminar evaluación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        evaluationService.deleteEvaluation(id);
        return ResponseEntity.noContent().build();
    }
}