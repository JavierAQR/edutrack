package com.edutrack.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.edutrack.dto.response.SectionResponse;
import com.edutrack.entities.AcademicLevel;
import com.edutrack.entities.Course;
import com.edutrack.entities.Grade;
import com.edutrack.entities.Institution;
import com.edutrack.entities.Section;
import com.edutrack.entities.StudentProfile;
import com.edutrack.entities.TeacherProfile;
import com.edutrack.repositories.CourseRepository;
import com.edutrack.repositories.InstitutionRepository;
import com.edutrack.repositories.SectionRepository;
import com.edutrack.repositories.StudentProfileRepository;
import com.edutrack.repositories.TeacherProfileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SectionService {

    private final SectionRepository sectionRepository;
    private final CourseRepository courseRepository;
    private final TeacherProfileRepository teacherProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final InstitutionRepository institutionRepository;

    public Section createSection(Long courseId, Long teacherId, Long institutionId, String name) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        TeacherProfile teacher = teacherProfileRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new RuntimeException("Institución no encontrada"));

        Section section = new Section();
        section.setName(name);
        section.setCourse(course);
        section.setTeacher(teacher);
        section.setInstitution(institution);

        return sectionRepository.save(section);
    }

    public List<SectionResponse> getSectionsByInstitution(Long institutionId) {
        List<Section> sections = sectionRepository.findByInstitutionId(institutionId);

        return sections.stream().map(section -> {
            Course course = section.getCourse();
            Grade grade = course.getGrade();
            AcademicLevel level = grade.getAcademicLevel();

            return new SectionResponse(
                    section.getId(),
                    section.getName(),

                    course.getId(),
                    course.getName(),

                    section.getTeacher().getId(),
                    section.getTeacher().getUser().getName(),

                    grade.getName(),
                    level.getName(),

                    section.getInstitution().getId(),
                    section.getInstitution().getName());
        }).collect(Collectors.toList());
    }

    @Transactional
    public Section assignStudentsToSection(Long sectionId, List<Long> studentIds) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Sección no encontrada"));

        List<StudentProfile> students = studentProfileRepository.findAllById(studentIds);

        if (students.size() != studentIds.size()) {
            throw new RuntimeException("Algunos estudiantes no fueron encontrados");
        }

        section.getStudents().addAll(students);

        return sectionRepository.save(section);
    }

    public List<StudentProfile> getStudentsInSection(Long sectionId) {
        Section section = sectionRepository.findById(sectionId)
            .orElseThrow(() -> new RuntimeException("Sección no encontrada"));
    
        return section.getStudents();
    }
}
