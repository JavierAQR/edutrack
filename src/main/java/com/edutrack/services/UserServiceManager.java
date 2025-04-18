package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.entities.User;
import com.edutrack.repositories.UserRepository;

@Service
public class UserServiceManager implements UserService{
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll(){
        return (List<User>) this.userRepository.findAll();
    }

    @Override
    public User save(User user){
        return this.userRepository.save(user);
    }

    @Override
    public User findById(Long id){
        return this.userRepository.findById(id).get();
    }

    @Override
    public User update(Long id, User user){
        User u = this.userRepository.findById(id).get();
        u.setId(u.getId());
        u.setName(u.getName());
        u.setLastname(u.getLastname());
        u.setEmail(u.getEmail());
        u.setCreatedAt(u.getCreatedAt());
        u.setPassword(u.getPassword());
        u.setRole(u.getRole());
        u.setActive(u.getActive());
        
        return this.userRepository.save(u);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
