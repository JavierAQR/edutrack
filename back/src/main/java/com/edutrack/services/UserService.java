package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.edutrack.entities.User;
import com.edutrack.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public User save(User student){
        return this.userRepository.save(student);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
               .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

     public User update(Long id, User user){
        User u = this.userRepository.findById(id).get();
        u.setName(user.getName());
        u.setLastname(user.getLastname());
        u.setEmail(user.getEmail());
        u.setBirthdate(user.getBirthdate());
        u.setPassword(passwordEncoder.encode(user.getPassword()));
  
        return this.userRepository.save(u);
    }

    // Método específico para buscar por email
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
               .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }


    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
