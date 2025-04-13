package com.example.ref_master_backend.controller;

import com.example.ref_master_backend.dto.StatistiquesGlobalesDto;
import com.example.ref_master_backend.service.StatistiquesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistiques")
public class StatistiquesController {

    @Autowired
    private StatistiquesService statistiquesService;

    @GetMapping
    public ResponseEntity<StatistiquesGlobalesDto> getStatistiquesPourUtilisateurConnecte() {
        // Utilise le service pour extraire et transformer les données
        return ResponseEntity.ok(statistiquesService.genererStatistiquesPourUtilisateurConnecte());
    }
}
