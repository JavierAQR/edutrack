package com.edutrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{
}
