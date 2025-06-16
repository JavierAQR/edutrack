package com.edutrack.services.impl;

import com.edutrack.dto.request.*;
import com.edutrack.entities.*;
import com.edutrack.repositories.*;
import com.edutrack.services.DashboardService;
import com.edutrack.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentDetailsRepository studentDetailsRepository;

    @Autowired
    private TeacherDetailsRepository teacherDetailsRepository;

    @Autowired
    private StudentSectionRepository studentSectionRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private CalificationRepository calificationRepository;

    @Override
    public List<StudentCourseDTO> getStudentCourses(String jwtToken) {
        String username = JwtUtils.getUsernameFromToken(jwtToken)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        StudentDetails student = studentDetailsRepository.findByUserInstitution_User(user)
                .orElseThrow(() -> new RuntimeException("Detalles de estudiante no encontrados"));

        return studentSectionRepository.findByStudent(student).stream()
                .map(studentSection -> {
                    Section section = studentSection.getSection();
                    Course course = section.getCourse();
                    TeacherDetails teacher = section.getTeacher();
                    User teacherUser = teacher.getUserInstitution().getUser();

                    return new StudentCourseDTO(
                            course.getId(),
                            course.getName(),
                            teacherUser.getName() + " " + teacherUser.getLastname(),
                            section.getPeriod().getName()
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentActivityDTO> getStudentActivities(String jwtToken) {
        String username = JwtUtils.getUsernameFromToken(jwtToken)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        StudentDetails student = studentDetailsRepository.findByUserInstitution_User(user)
                .orElseThrow(() -> new RuntimeException("Detalles de estudiante no encontrados"));

        // Obtener secciones del estudiante
        List<Long> sectionIds = studentSectionRepository.findByStudent(student).stream()
                .map(ss -> ss.getSection().getId())
                .collect(Collectors.toList());

        if (sectionIds.isEmpty()) {
            return Collections.emptyList();
        }

        // Obtener evaluaciones de esas secciones
        List<Evaluation> evaluations = evaluationRepository.findBySectionIdIn(sectionIds);

        // Obtener calificaciones del estudiante para marcar actividades completadas
        Map<Long, Calification> calificationMap = calificationRepository.findByStudent(student).stream()
                .collect(Collectors.toMap(
                        cal -> cal.getEvaluation().getId(),
                        cal -> cal
                ));

        return evaluations.stream()
                .map(evaluation -> {
                    boolean completed = calificationMap.containsKey(evaluation.getId());

                    return new StudentActivityDTO(
                            evaluation.getId(),
                            evaluation.getTitle(),
                            completed,
                            evaluation.getSection().getCourse().getName(),
                            evaluation.getDate().toString()
                    );
                })
                .collect(Collectors.toList());
    }

   /*  @Override
    public List<TeacherCourseDTO> getTeacherCourses(String jwtToken) {
        String username = JwtUtils.getUsernameFromToken(jwtToken)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        TeacherDetails teacher = teacherDetailsRepository.findByUserInstitution_User(user)
                .orElseThrow(() -> new RuntimeException("Detalles de profesor no encontrados"));

        List<Section> sections = sectionRepository.findByTeacher(teacher);

        // Agrupar por curso y ordenar por nombre de curso
        Map<Course, List<Section>> coursesMap = sections.stream()
                .sorted(Comparator.comparing(s -> s.getCourse().getName()))
                .collect(Collectors.groupingBy(
                        Section::getCourse,
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return coursesMap.entrySet().stream()
                .map(entry -> {
                    Course course = entry.getKey();
                    List<Section> courseSections = entry.getValue();

                    return new TeacherCourseDTO(
                            course.getId(),
                            course.getName(),
                            course.getAcademicArea(),
                            new AcademicLevelDTO(
                                    course.getAcademicLevel().getId(),
                                    course.getAcademicLevel().getName()
                            ),
                            courseSections.stream()
                                    .sorted(Comparator.comparing(Section::getStartTime))
                                    .map(section -> new TeacherCourseDTO.SectionInfoDTO(
                                            section.getId(),
                                            formatSchedule(section.getStartTime(), section.getEndTime()),
                                            section.getStartTime(),
                                            section.getEndTime(),
                                            section.getStudentSections().size(),
                                            section.getPeriod().getName()
                                    ))
                                    .collect(Collectors.toList())
                    );
                })
                .collect(Collectors.toList());
    } */

    // Método auxiliar para formatear el horario
    private String formatSchedule(LocalTime startTime, LocalTime endTime) {
        if (startTime == null || endTime == null) {
            return "Horario no definido";
        }
        return String.format("%02d:%02d - %02d:%02d",
                startTime.getHour(), startTime.getMinute(),
                endTime.getHour(), endTime.getMinute());
    }
}