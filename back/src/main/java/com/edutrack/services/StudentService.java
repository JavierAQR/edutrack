package com.edutrack.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    // private final UserRepository userRepository;
    // private final InstitutionRepository institutionRepository;
    // private final AcademicLevelRepository academicLevelRepository;
    // private final PasswordEncoder passwordEncoder;

    // @Transactional
    // public StudentDetails createStudent(StudentRegisterDTO studentDTO) {
    //     // Verificar si el email ya existe
    //     if (userRepository.existsByEmail(studentDTO.getEmail())) {
    //         throw new IllegalArgumentException("Email already in use");
    //     }
        
    //     // Obtener las entidades relacionadas
    //     Institution institution = institutionRepository.findById(studentDTO.getInstitutionId())
    //         .orElseThrow(() -> new EntityNotFoundException("Institution not found"));
        
    //     AcademicLevel academicLevel = academicLevelRepository.findById(studentDTO.getAcademicLevelId())
    //         .orElseThrow(() -> new EntityNotFoundException("Academic level not found"));
               
    //     // Crear el Student específico
    //     StudentDetails student = new StudentDetails();
    //     // Copiar propiedades del User al Student
    //     student.setName(studentDTO.getName());
    //     student.setLastname(studentDTO.getLastname());
    //     student.setEmail(studentDTO.getEmail());
    //     student.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
    //     student.setBirthdate(studentDTO.getBirthdate());
    //     student.setUserType(UserType.STUDENT);
        
    //     // Establecer campos específicos
    //     student.setInstitution(institution);
    //     student.setAcademicLevel(academicLevel);
    //     student.setAverageGrade(studentDTO.getAverageGrade());
        
    //     // Guardar (esto persistirá en ambas tablas)
    //     return userRepository.save(student);
    // }
    
    // @Autowired
    // private StudentRepository studentRepository;

    // public List<Student> findAll(){
    //     return (List<Student>) this.studentRepository.findAll();
    // }

    // public Student save(Student student){
    //     return this.studentRepository.save(student);
    // }

    // public Student findById(Long id){
    //     return this.studentRepository.findById(id).get();
    // }

    // public Student update(Long id, Student student){
    //     Student s = this.studentRepository.findById(id).get();
    //     s.setId(student.getId());
    //     s.setName(student.getName());
    //     s.setLastname(student.getLastname());
    //     s.setEmail(student.getEmail());
    //     s.setCreatedAt(student.getCreatedAt());
    //     s.setPassword(passwordEncoder.encode(student.getPassword()));
    //     s.setActive(student.getActive());
    //     s.setInstitution(student.getInstitution());
    //     s.setAcademicLevel(student.getAcademicLevel());
    //     s.setAverageGrade(student.getAverageGrade());
        
    //     return this.studentRepository.save(s);
    // }

    // public void delete(Long id) {
    //     studentRepository.deleteById(id);
    // }
}
