package com.edutrack.repositories;

import com.edutrack.entities.UserInstitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInstitutionRepository extends JpaRepository<UserInstitution, Long> {
    List<UserInstitution> findByUserUsername(String username);
}
