package com.edutrack.services;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;

import com.edutrack.entities.Institution;
import com.edutrack.entities.UserInstitution;
import com.edutrack.entities.enums.InstitutionUserStatus;
import com.edutrack.repositories.UserInstitutionRepository;

@Service
public class UserInstitutionService {
    private final UserInstitutionRepository userInstitutionRepository;

    public UserInstitutionService(UserInstitutionRepository userInstitutionRepository) {
        this.userInstitutionRepository = userInstitutionRepository;
    }

    public List<Institution> getInstitutionsByUsername(String username) {

        List<UserInstitution> userInstitutions = userInstitutionRepository.findByUserUsername(username);
        
        // Extrae solo las instituciones activas o con status que quieras (opcional)
        return userInstitutions.stream()
            .filter(ui -> ui.getStatus() == InstitutionUserStatus.ACTIVE) // o el status que consideres válido
            .map(UserInstitution::getInstitution)
            .collect(Collectors.toList());
    }
}
