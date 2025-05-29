package com.edutrack.repositories;

import com.edutrack.entities.StudentDetails;
import com.edutrack.entities.UserInstitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentDetailsRepository extends JpaRepository<StudentDetails, Long> {
    Optional<StudentDetails> findByUserInstitution(UserInstitution userInstitution);
}
