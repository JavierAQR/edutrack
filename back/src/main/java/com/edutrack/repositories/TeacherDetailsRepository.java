package com.edutrack.repositories;

import com.edutrack.entities.TeacherDetails;
import com.edutrack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherDetailsRepository extends JpaRepository<TeacherDetails, Long> {
    Optional<TeacherDetails> findByUserInstitution_User(User user);
}
