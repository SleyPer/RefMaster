package com.example.ref_master_backend.controller;

import com.example.ref_master_backend.entity.Designation;
import com.example.ref_master_backend.service.DesignationService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    @Autowired
    private DesignationService designationService;

    // Récupérer toutes les désignations
    @GetMapping
    public ResponseEntity<Map<String, List<Designation>>> getAllDesignations() {
        List<Designation> all = designationService.getAllDesignations();

        LocalDate now = LocalDate.now();

        List<Designation> past = all.stream()
                .filter(d -> d.getDate().isBefore(now))
                .collect(Collectors.toList());

        List<Designation> future = all.stream()
                .filter(d -> d.getDate().isAfter(now))
                .collect(Collectors.toList());

        Map<String, List<Designation>> response = new HashMap<>();
        response.put("past", past);
        response.put("future", future);

        return ResponseEntity.ok(response);
    }

    // Récupérer une désignation par ID
    @GetMapping("/{id}")
    public ResponseEntity<Designation> getDesignationById(@PathVariable Long id) {
        Optional<Designation> designation = designationService.getDesignationById(id);
        return designation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter une nouvelle désignation
    @PostMapping
    public ResponseEntity<Designation> createDesignation(@RequestBody Designation designation) {
        Designation savedDesignation = designationService.saveDesignation(designation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDesignation);
    }

    // Supprimer une désignation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesignation(@PathVariable Long id) {
        designationService.deleteDesignation(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload-pdf")
    public ResponseEntity<?> upload(@RequestParam("files") MultipartFile[] files) {
        List<Designation> createdDesignations = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                // Vérification du type MIME
                if (!"application/pdf".equals(file.getContentType())) {
                    return ResponseEntity.badRequest().body("Le fichier " + file.getOriginalFilename() + " n'est pas un PDF.");
                }

                // Extraction du texte du PDF
                PDDocument document = PDDocument.load(file.getInputStream());
                PDFTextStripper pdfStripper = new PDFTextStripper();
                String text = pdfStripper.getText(document);
                document.close();

                System.out.println("Désignation du fichier : " + file.getOriginalFilename());
                System.out.println(text);

                // Création d'une désignation à partir du texte
                Designation newDesignation = designationService.createFromPdfText(text);
                createdDesignations.add(newDesignation);

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erreur lors du traitement de " + file.getOriginalFilename() + " : " + e.getMessage());
            }
        }

        return ResponseEntity.ok(createdDesignations);
    }
}
