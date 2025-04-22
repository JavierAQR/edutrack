package com.edutrack.services;

import com.edutrack.entities.Evaluation;
import com.edutrack.entities.Section;
import com.edutrack.repositories.EvaluationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }


    @Transactional
    public Evaluation createEvaluation(Evaluation evaluation) {
        if (evaluation.getEndTime().isBefore(evaluation.getStartTime())) {
            throw new IllegalArgumentException("La hora de fin debe ser posterior a la de inicio");
        }
        return evaluationRepository.save(evaluation);
    }


    public List<Evaluation> getEvaluationsBySection(Section section) {
        return evaluationRepository.findBySection(section);
    }


    @Transactional
    public Evaluation updateEvaluation(Long id, Evaluation updatedEvaluation) {
        Evaluation existing = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluación no encontrada"));

        existing.setTitle(updatedEvaluation.getTitle());
        existing.setDescription(updatedEvaluation.getDescription());
        existing.setDate(updatedEvaluation.getDate());
        existing.setStartTime(updatedEvaluation.getStartTime());
        existing.setEndTime(updatedEvaluation.getEndTime());
        existing.setType(updatedEvaluation.getType());

        return evaluationRepository.save(existing);
    }


    @Transactional
    public void deleteEvaluation(Long id) {
        evaluationRepository.deleteById(id);
    }
}