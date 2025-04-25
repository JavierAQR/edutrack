package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.entities.Admin;
import com.edutrack.repositories.AdminRepository;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> findAll(){
        return (List<Admin>) this.adminRepository.findAll();
    }

    public Admin save(Admin admin){
        return this.adminRepository.save(admin);
    }

    public Admin findById(Long id){
        return this.adminRepository.findById(id).get();
    }

    public Admin update(Long id, Admin admin){
        Admin a = this.adminRepository.findById(id).get();
        a.setId(a.getId());
        a.setName(a.getName());
        a.setLastname(a.getLastname());
        a.setEmail(a.getEmail());
        a.setCreatedAt(a.getCreatedAt());
        a.setPassword(a.getPassword());
        a.setActive(a.getActive());
        a.setAccessLevel(a.getAccessLevel());
        
        return this.adminRepository.save(a);
    }

    public void delete(Long id) {
        adminRepository.deleteById(id);
    }
}
