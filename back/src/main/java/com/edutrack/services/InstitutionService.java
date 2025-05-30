package com.edutrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.entities.Institution;
import com.edutrack.repositories.InstitutionRepository;

@Service
public class InstitutionService {
    
    @Autowired
    private InstitutionRepository institutionRepository;

    public List<Institution> findAll(){
        return (List<Institution>) this.institutionRepository.findAll();
    }

    public Institution save(Institution institution){
        return this.institutionRepository.save(institution);
    }

    public Institution findById(Long id){
        return this.institutionRepository.findById(id).get();
    }

    public Institution update(Long id, Institution institution){
        Institution i = this.institutionRepository.findById(id).get();
        i.setId(i.getId());
        i.setName(i.getName());

        return this.institutionRepository.save(i);
    }

    public void delete(Long id){
        institutionRepository.deleteById(id);
    }
}
