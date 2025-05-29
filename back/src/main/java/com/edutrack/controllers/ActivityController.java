package com.edutrack.controllers;

import com.edutrack.dto.request.ActivityDTO;
import com.edutrack.entities.*;
import com.edutrack.entities.enums.UserType;
import com.edutrack.repositories.*;
import com.edutrack.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final AuthService authService;
    private final EvaluationRepository evaluationRepository;
    private final StudentSectionRepository studentSectionRepository;
    private final UserInstitutionRepository userInstitutionRepository;
    private final TeacherDetailsRepository teacherRepository;
    private final StudentDetailsRepository studentDetailsRepository;
    private final CalificationRepository calificationRepository;

    @GetMapping("/pending")
    public ResponseEntity<List<ActivityDTO>> getPendingActivities(Principal principal) {
        try {
            String username = principal.getName();
            User user = authService.getUserByUsername(username);
            UserInstitution userInstitution = userInstitutionRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Usuario no asociado a ninguna institución"));

            List<ActivityDTO> activities;

            if (user.getUserType() == UserType.STUDENT) {
                StudentDetails student = studentDetailsRepository.findByUserInstitution(userInstitution)
                        .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

                // Obtener las secciones del estudiante
                List<StudentSection> studentSections = studentSectionRepository.findByUserInstitution(userInstitution);

                // Obtener las evaluaciones para esas secciones
                List<Evaluation> evaluations = evaluationRepository.findBySectionIn(
                        studentSections.stream()
                                .map(StudentSection::getSection)
                                .collect(Collectors.toList())
                );

                activities = evaluations.stream()
                        .filter(evaluation -> !evaluation.getDate().isBefore(LocalDate.now())) // Solo futuras
                        .map(evaluation -> new ActivityDTO(
                                evaluation.getId(),
                                evaluation.getTitle(),
                                calificationRepository.existsByEvaluationAndStudent(evaluation, student),
                                evaluation.getSection().getCourse().getName(),
                                evaluation.getDate().toString(),
                                evaluation.getType().toString()
                        ))
                        .collect(Collectors.toList());

            } else if (user.getUserType() == UserType.TEACHER) {
                TeacherDetails teacher = teacherRepository.findByUserInstitution(userInstitution)
                        .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

                activities = evaluationRepository.findBySectionTeacherAndDateGreaterThanEqual(teacher, LocalDate.now()).stream()
                        .map(evaluation -> new ActivityDTO(
                                evaluation.getId(),
                                evaluation.getTitle(),
                                false, // Por defecto no completada para profesores
                                evaluation.getSection().getCourse().getName(),
                                evaluation.getDate().toString(),
                                evaluation.getType().toString()
                        ))
                        .collect(Collectors.toList());
            } else {
                throw new RuntimeException("El tipo de usuario no tiene actividades asignadas");
            }

            return ResponseEntity.ok(activities);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}