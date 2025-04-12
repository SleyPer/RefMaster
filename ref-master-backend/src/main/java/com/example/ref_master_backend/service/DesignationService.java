package com.example.ref_master_backend.service;

import com.example.ref_master_backend.entity.Arbitre;
import com.example.ref_master_backend.entity.Designation;
import com.example.ref_master_backend.repository.ArbitreRepository;
import com.example.ref_master_backend.repository.DesignationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DesignationService {

    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private ArbitreRepository arbitreRepository;

    // Récupérer toutes les désignations
    public List<Designation> getAllDesignations() {
        return designationRepository.findAll();
    }

    // Ajouter une nouvelle désignation
    public Designation saveDesignation(Designation designation) {
        if (designation.getCollegue() != null && designation.getCollegue().getId() != null) {
            Arbitre collegueComplet = arbitreRepository.findById(designation.getCollegue().getId())
                    .orElseThrow(() -> new RuntimeException("Arbitre non trouvé"));
            designation.setCollegue(collegueComplet);
        }
        return designationRepository.save(designation);
    }

    // Récupérer une désignation par ID
    public Optional<Designation> getDesignationById(Long id) {
        return designationRepository.findById(id);
    }

    // Supprimer une désignation
    public void deleteDesignation(Long id) {
        designationRepository.deleteById(id);
    }
}
