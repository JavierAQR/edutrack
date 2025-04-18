package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
}
