package com.edutrack.services;

import com.edutrack.entities.Institution;
import java.util.List;

public interface InstitutionAdminService {
    List<Institution> getInstitutionsForCurrentAdmin();
}
