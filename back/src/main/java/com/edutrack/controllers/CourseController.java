package com.edutrack.controllers;

import com.edutrack.auth.AuthService;
import com.edutrack.dto.request.CourseDTO;
import com.edutrack.entities.*;
import com.edutrack.entities.enums.UserType;
import com.edutrack.repositories.*;
import com.edutrack.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    @Autowired
    private CourseService courseService;
    private final AuthService authService;
    private final SectionRepository sectionRepository;
    private final StudentSectionRepository studentSectionRepository;
    private final TeacherDetailsRepository teacherRepository;
    private final UserInstitutionRepository userInstitutionRepository;
    private final StudentDetailsRepository studentDetailsRepository;
    @GetMapping
    public List<Course> getAll() {
        return courseService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getById(@PathVariable Long id) {
        return courseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Course create(@RequestBody Course course) {
        return courseService.save(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Long id, @RequestBody Course course) {
        return courseService.findById(id)
                .map(existing -> {
                    course.setId(id);
                    return ResponseEntity.ok(courseService.save(course));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (courseService.findById(id).isPresent()) {
            courseService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<CourseDTO>> getMyCourses(Principal principal) {
        String username = principal.getName();
        User user = authService.getUserByUsername(username);
        UserInstitution userInstitution = userInstitutionRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Usuario no asociado a ninguna institución"));

        List<CourseDTO> courses;

        if (user.getUserType() == UserType.STUDENT) {
            // Cambio clave aquí: usar studentDetailsRepository en lugar de studentSectionRepository
            StudentDetails student = studentDetailsRepository.findByUserInstitution(userInstitution)
                    .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

            // Ahora buscamos las secciones del estudiante
            List<StudentSection> studentSections = studentSectionRepository.findByStudent(student);

            if (studentSections.isEmpty()) {
                throw new RuntimeException("El estudiante no está inscrito en ningún curso");
            }

            courses = studentSections.stream()
                    .map(studentSection -> {
                        Section section = studentSection.getSection();
                        Course course = section.getCourse();
                        return new CourseDTO(
                                course.getId(),
                                course.getName(),
                                course.getAcademicArea(),
                                section.getTeacher().getUserInstitution().getUser().getName() + " " +
                                        section.getTeacher().getUserInstitution().getUser().getLastname(),
                                section.getPeriod().getName()
                        );
                    })
                    .collect(Collectors.toList());

        } else if (user.getUserType() == UserType.TEACHER) {
            TeacherDetails teacher = teacherRepository.findByUserInstitution(userInstitution)
                    .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

            List<Section> teacherSections = sectionRepository.findByTeacher(teacher);

            if (teacherSections.isEmpty()) {
                throw new RuntimeException("El profesor no tiene asignado ningún curso");
            }

            courses = teacherSections.stream()
                    .map(section -> {
                        Course course = section.getCourse();
                        return new CourseDTO(
                                course.getId(),
                                course.getName(),
                                course.getAcademicArea(),
                                teacher.getUserInstitution().getUser().getName() + " " +
                                        teacher.getUserInstitution().getUser().getLastname(),
                                section.getPeriod().getName()
                        );
                    })
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("El tipo de usuario no tiene cursos asignados");
        }

        return ResponseEntity.ok(courses);
    }
}
