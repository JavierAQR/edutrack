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

import com.edutrack.entities.Teacher;
import com.edutrack.services.TeacherService;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    
    @Autowired
    private TeacherService teacherService;

    @GetMapping()
    @Transactional(readOnly = true)
    public List<Teacher> findAllTeachers(){
        return this.teacherService.findAll();
    }

    @PostMapping()
    @Transactional
    public Teacher save(@RequestBody Teacher teacher){
        return this.teacherService.save(teacher);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public Teacher getTeacherById(@PathVariable Long id){
        return this.teacherService.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Teacher teacher){
        Optional<Teacher> t = Optional.of(this.teacherService.findById(id));
        if(t.isPresent()){
            Teacher newTeacher = t.get();
            newTeacher.setName(teacher.getName());
            newTeacher.setLastname(teacher.getLastname());
            newTeacher.setEmail(teacher.getEmail());
            newTeacher.setActive(teacher.getActive());
            newTeacher.setPassword(teacher.getPassword());
            newTeacher.setBirthdate(teacher.getBirthdate());
            newTeacher.setInstitution(teacher.getInstitution());
             
            return ResponseEntity.status(HttpStatus.CREATED).body(this.teacherService.update(id, newTeacher));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.delete(id); 
        return ResponseEntity.noContent().build();
    }
}
