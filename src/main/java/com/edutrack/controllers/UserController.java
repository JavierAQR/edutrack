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

import com.edutrack.entities.User;
import com.edutrack.services.UserServiceManager;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserServiceManager userServiceManager;

    @GetMapping()
    @Transactional(readOnly = true)
    public List<User> findAllUsers(){
        return this.userServiceManager.findAll();
    }

    @PostMapping()
    @Transactional
    public User save(@RequestBody User user){
        return this.userServiceManager.save(user);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public User getUserById(@PathVariable Long id){
        return this.userServiceManager.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody User user){
        Optional<User> u = Optional.of(this.userServiceManager.findById(id));
        if(u.isPresent()){
            User newUser = u.get();
            newUser.setName(user.getName());
            newUser.setLastname(user.getLastname());
            newUser.setEmail(user.getEmail());
            newUser.setActive(user.getActive());
            newUser.setPassword(user.getPassword());
            newUser.setBirthdate(user.getBirthdate());
            newUser.setInstitution(user.getInstitution());
            newUser.setRole(user.getRole());
             
            return ResponseEntity.status(HttpStatus.CREATED).body(this.userServiceManager.update(id, newUser));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userServiceManager.delete(id); 
        return ResponseEntity.noContent().build();
    }


}
