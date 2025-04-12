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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    @Autowired
    private DesignationService designationService;

    // Récupérer toutes les désignations
    @GetMapping
    public List<Designation> getAllDesignations() {
        return designationService.getAllDesignations();
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
    public ResponseEntity<?> uploadPdf(@RequestParam("file") MultipartFile file) throws IOException {
        // Vérification du type du fichier PDF
        if (!file.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest().body("Type de fichier invalide. Merci de fournir un fichier de type PDF.");
        }

        // Extraction du texte du PDF
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        document.close();

        System.out.println("Voici à quoi ressemble la désignation : ");
        System.out.println(text);

        // Appel d'un service pour parser le texte et créer une nouvelle désignation
        Designation newDesignation = designationService.createFromPdfText(text);

        return ResponseEntity.ok(newDesignation);
    }
}
