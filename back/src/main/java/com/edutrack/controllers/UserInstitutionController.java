package com.edutrack.controllers;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.entities.Institution;
import com.edutrack.services.UserInstitutionService;

@RestController
@RequestMapping("/api/user-institutions")
public class UserInstitutionController {

    private final UserInstitutionService userInstitutionService;

    public UserInstitutionController(UserInstitutionService userInstitutionService) {
        this.userInstitutionService = userInstitutionService;
    }

    @GetMapping("/my-institutions")
    public List<Institution> getMyInstitutions(Authentication authentication) {
        String username = authentication.getName(); // Obtiene el username del contexto de seguridad (token JWT)
        return userInstitutionService.getInstitutionsByUsername(username);
    }

}
