package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.entities.Student;
import com.edutrack.repositories.StudentRepository;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> findAll(){
        return (List<Student>) this.studentRepository.findAll();
    }

    public Student save(Student student){
        return this.studentRepository.save(student);
    }

    public Student findById(Long id){
        return this.studentRepository.findById(id).get();
    }

    public Student update(Long id, Student student){
        Student s = this.studentRepository.findById(id).get();
        s.setId(s.getId());
        s.setName(s.getName());
        s.setLastname(s.getLastname());
        s.setEmail(s.getEmail());
        s.setCreatedAt(s.getCreatedAt());
        s.setPassword(s.getPassword());
        s.setActive(s.getActive());
        s.setInstitution(s.getInstitution());
        s.setAcademicLevel(s.getAcademicLevel());
        s.setAverageGrade(s.getAverageGrade());
        
        return this.studentRepository.save(s);
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
