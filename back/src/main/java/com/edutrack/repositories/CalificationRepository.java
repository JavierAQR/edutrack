package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edutrack.entities.Calification;

public interface CalificationRepository extends JpaRepository<Calification, Long> {

}
