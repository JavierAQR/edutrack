package com.edutrack.repositories;

import com.edutrack.entities.User;
import com.edutrack.entities.UserInstitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInstitutionRepository extends JpaRepository<UserInstitution, Long> {
    Optional<UserInstitution> findByUser(User user);
}
