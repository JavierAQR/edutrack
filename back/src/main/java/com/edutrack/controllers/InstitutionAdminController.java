package com.edutrack.controllers;

import com.edutrack.entities.Institution;
import com.edutrack.services.InstitutionAdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institution-admin")
public class InstitutionAdminController {

    private final InstitutionAdminService institutionAdminService;

    public InstitutionAdminController(InstitutionAdminService institutionAdminService) {
        this.institutionAdminService = institutionAdminService;
    }

    @GetMapping("/institutions")
    public List<Institution> getOwnInstitutions() {
        return institutionAdminService.getInstitutionsForCurrentAdmin();
    }
}
