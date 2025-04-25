package com.edutrack.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.entities.Admin;
import com.edutrack.services.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    @GetMapping()
    @Transactional(readOnly = true)
    public List<Admin> findAllAdmins(){
        return this.adminService.findAll();
    }

    @PostMapping()
    @Transactional
    public Admin save(@RequestBody Admin admin){
        return this.adminService.save(admin);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public Admin getAdminById(@PathVariable Long id){
        return this.adminService.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Admin admin){
        Optional<Admin> a = Optional.of(this.adminService.findById(id));
        if(a.isPresent()){
            Admin newAdmin = a.get();
            newAdmin.setName(admin.getName());
            newAdmin.setLastname(admin.getLastname());
            newAdmin.setEmail(admin.getEmail());
            newAdmin.setActive(admin.getActive());
            newAdmin.setPassword(admin.getPassword());
            newAdmin.setBirthdate(admin.getBirthdate());
             
            return ResponseEntity.status(HttpStatus.CREATED).body(this.adminService.update(id, newAdmin));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.delete(id); 
        return ResponseEntity.noContent().build();
    }
}
