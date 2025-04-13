package com.example.ref_master_backend.service;

import com.example.ref_master_backend.entity.Arbitre;
import com.example.ref_master_backend.entity.Designation;
import com.example.ref_master_backend.repository.ArbitreRepository;
import com.example.ref_master_backend.repository.DesignationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class DesignationService {

    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private ArbitreRepository arbitreRepository;

    // Récupérer toutes les désignations
    public List<Designation> getAllDesignations() {
        return designationRepository.findAllByOrderByDateAsc();
    }

    // Ajouter une nouvelle désignation
    public Designation saveDesignation(Designation designation) {
        if (designation.getCollegue() != null && designation.getCollegue().getId() != null) {
            Arbitre collegueComplet = arbitreRepository.findById(designation.getCollegue().getId())
                    .orElseThrow(() -> new RuntimeException("Arbitre non trouvé."));
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

    public Designation createFromPdfText(String text) {
        Designation designation = new Designation();

        // 1. Date du match
        Matcher dateMatcher = Pattern.compile("DATE\\s*:\\s*([0-9]{2}/[0-9]{2}/[0-9]{4})").matcher(text);
        if (dateMatcher.find()) {
            String dateStr = dateMatcher.group(1);
            designation.setDate(LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }

        // 2. Division
        Matcher divisionMatcher = Pattern.compile("COMPETITION:\\s*\\d{2}/\\d{2}/\\d{4}\\s+\\d{2}:\\d{2}\\s+\\d+\\s+([^\\(\\r\\n]+)").matcher(text);
        if (divisionMatcher.find()) {
            designation.setDivision(divisionMatcher.group(1).trim());
        }

        // 3. Équipe A (RECEVANT)
        Matcher equipeAMatcher = Pattern.compile("A\\.\\s+GROUPEMENT SPORTIF RECEVANT\\s*:\\s*(.+)").matcher(text);
        if (equipeAMatcher.find()) {
            designation.setEquipeA(equipeAMatcher.group(1).trim());
        }

        // 4. Équipe B (VISITEUR)
        Matcher equipeBMatcher = Pattern.compile("B\\.\\s+GROUPEMENT SPORTIF VISITEUR\\s*:\\s*(.+)").matcher(text);
        if (equipeBMatcher.find()) {
            designation.setEquipeB(equipeBMatcher.group(1).trim());
        }

        // 5. Salle
        Matcher salleMatcher = Pattern.compile("(SALLE|Salle|GYMNASE|Gymnase|COMPLEXE|Complexe|HALLE|Halle|CENTRE|Centre)\\s+([A-ZÉÈÀÙ' \\-]+)").matcher(text);
        if (salleMatcher.find()) {
            designation.setSalle(salleMatcher.group(1).trim() + " " + salleMatcher.group(2).trim());
        }

        // 6. Ville
        Matcher villeMatcher = Pattern.compile("(?:SALLE|Salle|GYMNASE|Gymnase|COMPLEXE|Complexe|HALLE|Halle|CENTRE|Centre).*?(\\d{5})\\s+([A-ZÉÈÀÙ\\-\\' ]+)", Pattern.MULTILINE).matcher(text);
        if (villeMatcher.find()) {
            String ville = villeMatcher.group(2).trim();
            designation.setVille(ville);
        }

        // 7. Collègue - prénom et nom
        Matcher collegueMatcher = Pattern.compile(
                "Arbitre\\s*:\\s*(?!PREVOST Thomas)((?:[A-Z]+\\s?)+)\\s+((?:[A-Za-zÀ-ÿ\\-]+\\s?)+)"
        ).matcher(text);

        if (collegueMatcher.find()) {
            String nom = collegueMatcher.group(1).trim();
            String prenom = collegueMatcher.group(2).trim();

            nom = nom.replaceAll("\\s+", " ");
            prenom = prenom.replaceAll("\\s+", " ");

            String finalNom = nom;
            String finalPrenom = prenom;
            Arbitre collegue = arbitreRepository.findByNomAndPrenom(nom, prenom)
                    .orElseThrow(() -> new RuntimeException("Impossible de lire le collègue arbitre : " + finalNom + " " + finalPrenom));

            designation.setCollegue(collegue);
        }

        // 8. Km et revenu de PREVOST (ton arbitre)
        Matcher kmRevenuMatcher = Pattern.compile("Arbitre\\s*:\\s*PREVOST Thomas.*?Nbre de kms aller\\s*:\\s*(\\d{1,3}\\.\\d{2}).*?Indemnité\\s*:\\s*(\\d{1,3}\\.\\d{2})", Pattern.DOTALL).matcher(text);
        if (kmRevenuMatcher.find()) {
            try {
                designation.setKmParcourus(Double.parseDouble(kmRevenuMatcher.group(1)));
                designation.setRevenus(Double.parseDouble(kmRevenuMatcher.group(2)));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        designationRepository.save(designation);
        return designation;
    }
}
