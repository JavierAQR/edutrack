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

import com.edutrack.entities.Institution;
import com.edutrack.services.InstitutionService;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {
    
    @Autowired
    private InstitutionService institutionService;

    @GetMapping()
    @Transactional(readOnly = true)
    public List<Institution> findAllInstitutions(){
        return this.institutionService.findAll();
    }

    @PostMapping()
    @Transactional
    public Institution save(@RequestBody Institution institution){
        return this.institutionService.save(institution);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public Institution getInstitutionById(@PathVariable Long id){
        return this.institutionService.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Institution updatedInstitution) {
        Optional<Institution> optionalInstitution = Optional.of(this.institutionService.findById(id));
        if(optionalInstitution.isPresent()){
            Institution existingInstitution = optionalInstitution.get();

            // Actualizar todos los campos
            existingInstitution.setName(updatedInstitution.getName());
            existingInstitution.setAddress(updatedInstitution.getAddress());
            existingInstitution.setDescription(updatedInstitution.getDescription());
            existingInstitution.setPhone(updatedInstitution.getPhone());
            existingInstitution.setWebsite(updatedInstitution.getWebsite());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(this.institutionService.update(id, existingInstitution));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        institutionService.delete(id); 
        return ResponseEntity.noContent().build();
    }
}
