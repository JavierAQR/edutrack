package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.entities.Teacher;
import com.edutrack.repositories.TeacherRepository;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> findAll(){
        return (List<Teacher>) this.teacherRepository.findAll();
    }

    public Teacher save(Teacher teacher){
        return this.teacherRepository.save(teacher);
    }

    public Teacher findById(Long id){
        return this.teacherRepository.findById(id).get();
    }

    public Teacher update(Long id, Teacher teacher){
        Teacher t = this.teacherRepository.findById(id).get();
        t.setId(t.getId());
        t.setName(t.getName());
        t.setLastname(t.getLastname());
        t.setEmail(t.getEmail());
        t.setCreatedAt(t.getCreatedAt());
        t.setPassword(t.getPassword());
        t.setActive(t.getActive());
        t.setInstitution(t.getInstitution());
        t.setProfessionalTitle(t.getProfessionalTitle());
        t.setSpeciality(t.getSpeciality());
        
        return this.teacherRepository.save(t);
    }

    public void delete(Long id) {
        teacherRepository.deleteById(id);
    }
}
