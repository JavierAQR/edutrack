package com.edutrack.services.impl;

import com.edutrack.entities.Institution;
import com.edutrack.entities.InstitutionGrade;
import com.edutrack.repositories.InstitutionGradeRepository;
import com.edutrack.repositories.InstitutionRepository;
import com.edutrack.repositories.UserRepository;
import com.edutrack.services.InstitutionGradeAdminService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionGradeAdminServiceImpl implements InstitutionGradeAdminService {

    private final InstitutionRepository institutionRepository;
    private final InstitutionGradeRepository institutionGradeRepository;
    private final UserRepository userRepository;

    public InstitutionGradeAdminServiceImpl(
            InstitutionRepository institutionRepository,
            InstitutionGradeRepository institutionGradeRepository,
            UserRepository userRepository) {
        this.institutionRepository = institutionRepository;
        this.institutionGradeRepository = institutionGradeRepository;
        this.userRepository = userRepository;
    }

    private Institution getCurrentAdminInstitution() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return institutionRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Institución no encontrada para el usuario"));
    }

    @Override
    public List<InstitutionGrade> getGradesForCurrentInstitutionAdmin() {
        Institution institution = getCurrentAdminInstitution();
        return institutionGradeRepository.findByInstitutionId(institution.getId());
    }

    @Override
    public InstitutionGrade assignGrade(InstitutionGrade grade) {
        Institution institution = getCurrentAdminInstitution();
        grade.setInstitution(institution); // forzamos su institución
        return institutionGradeRepository.save(grade);
    }

    @Override
    public InstitutionGrade updateGrade(Long id, InstitutionGrade grade) {
        InstitutionGrade existing = institutionGradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignación no encontrada"));
        grade.setId(existing.getId());
        grade.setInstitution(existing.getInstitution()); // mantener su institución original
        return institutionGradeRepository.save(grade);
    }

    @Override
    public void deleteGrade(Long id) {
        institutionGradeRepository.deleteById(id);
    }
}
