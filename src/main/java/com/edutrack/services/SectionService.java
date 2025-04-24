package com.edutrack.services;

import com.edutrack.entities.Section;
import com.edutrack.repositories.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;a

@Service
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    public List<Section> findAll() {
        return sectionRepository.findAll();
    }

    public Optional<Section> findById(Long id) {
        return sectionRepository.findById(id);
    }

    public Section save(Section section) {
        return sectionRepository.save(section);
    }

    public Section update(Long id, Section updatedSection) {
        return sectionRepository.findById(id)
                .map(section -> {
                    section.setTeacher(updatedSection.getTeacher());
                    section.setPeriod(updatedSection.getPeriod());
                    section.setCourse(updatedSection.getCourse());
                    section.setDate(updatedSection.getDate());
                    section.setStartTime(updatedSection.getStartTime());
                    section.setEndTime(updatedSection.getEndTime());
                    return sectionRepository.save(section);
                })
                .orElseThrow(() -> new RuntimeException("Section not found with id " + id));
    }

    public void delete(Long id) {
        sectionRepository.deleteById(id);
    }
}
