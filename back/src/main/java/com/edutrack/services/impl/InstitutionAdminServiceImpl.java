package com.edutrack.services.impl;

import com.edutrack.entities.Institution;
import com.edutrack.entities.User;
import com.edutrack.repositories.InstitutionRepository;
import com.edutrack.repositories.UserRepository;
import com.edutrack.services.InstitutionAdminService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionAdminServiceImpl implements InstitutionAdminService {

    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;

    public InstitutionAdminServiceImpl(InstitutionRepository institutionRepository, UserRepository userRepository) {
        this.institutionRepository = institutionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Institution> getInstitutionsForCurrentAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return institutionRepository.findByUserId(user.getId());
    }
}
