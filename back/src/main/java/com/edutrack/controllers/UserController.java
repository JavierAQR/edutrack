package com.edutrack.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.edutrack.auth.AuthService;
import com.edutrack.dto.request.UserDetailsDTO;
import com.edutrack.entities.StudentDetails;
import com.edutrack.entities.TeacherDetails;
import com.edutrack.entities.UserInstitution;
import com.edutrack.entities.enums.UserType;
import com.edutrack.repositories.StudentDetailsRepository;
import com.edutrack.repositories.TeacherDetailsRepository;
import com.edutrack.repositories.UserInstitutionRepository;
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
import com.edutrack.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    private final AuthService authService;
    private final StudentDetailsRepository studentRepository;
    private final TeacherDetailsRepository teacherRepository;
    private final UserInstitutionRepository userInstitutionRepository;

    @GetMapping()
    @Transactional(readOnly = true)
    public List<User> findAllStudents(){
        return this.userService.findAll();
    }

    @PostMapping()
    @Transactional
    public User save(@RequestBody User user){
        return this.userService.save(user);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public User getUserById(@PathVariable Long id){
        return this.userService.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody User user){
        Optional<User> s = Optional.of(this.userService.findById(id));
        if(s.isPresent()){
            User newUser = s.get();
            newUser.setName(user.getName());
            newUser.setLastname(user.getLastname());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(user.getPassword());
            newUser.setBirthdate(user.getBirthdate());
             
            return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.update(id, newUser));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        userService.delete(id); 
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailsDTO> getCurrentUser(Principal principal) {
        String username = principal.getName();
        User user = authService.getUserByUsername(username);

        // Obtener la relación usuario-institución
        UserInstitution userInstitution = userInstitutionRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Usuario no asociado a ninguna institución"));

        UserDetailsDTO userDetails;

        if (user.getUserType() == UserType.STUDENT) {
            StudentDetails student = studentRepository.findByUserInstitution(userInstitution)
                    .orElseThrow(() -> new RuntimeException("Detalles de estudiante no encontrados"));
            userDetails = new UserDetailsDTO(
                    user.getId(),
                    user.getName(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getUserType().toString(),
                    student.getStudentCode(),
                    student.getAcademicLevel().getName(),
                    userInstitution.getInstitution().getName()
            );
        } else if (user.getUserType() == UserType.TEACHER) {
            TeacherDetails teacher = teacherRepository.findByUserInstitution(userInstitution)
                    .orElseThrow(() -> new RuntimeException("Detalles de profesor no encontrados"));
            userDetails = new UserDetailsDTO(
                    user.getId(),
                    user.getName(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getUserType().toString(),
                    teacher.getTeacherCode(),
                    teacher.getSpecialization(),
                    userInstitution.getInstitution().getName()
            );
        } else {
            userDetails = new UserDetailsDTO(
                    user.getId(),
                    user.getName(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getUserType().toString(),
                    null,
                    null,
                    userInstitution.getInstitution().getName()
            );
        }

        return ResponseEntity.ok(userDetails);
    }
}
