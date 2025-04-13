package com.example.ref_master_backend.service;

import com.example.ref_master_backend.dto.StatistiquesGlobalesDto;
import com.example.ref_master_backend.dto.StatistiquesParAnneeDto;
import com.example.ref_master_backend.dto.StatistiquesParMoisDto;
import com.example.ref_master_backend.entity.Designation;
import com.example.ref_master_backend.repository.DesignationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class StatistiquesService {

    @Autowired
    private DesignationRepository designationRepository;

    public StatistiquesGlobalesDto genererStatistiquesPourUtilisateurConnecte() {
        List<Designation> designations = designationRepository.findAll();

        List<Designation> designationsPassees = designations.stream()
                .filter(d -> d.getDate().isBefore(LocalDate.now()))
                .toList();

        StatistiquesGlobalesDto stats = new StatistiquesGlobalesDto();
        stats.setTotalMatchs(designationsPassees.size());
        stats.setTotalKm(designationsPassees.stream().mapToDouble(Designation::getKmParcourus).sum());
        stats.setTotalRevenus(designationsPassees.stream().mapToDouble(Designation::getRevenus).sum());

        Map<Integer, List<Designation>> designationsParAnnee = designationsPassees.stream()
                .collect(Collectors.groupingBy(d -> d.getDate().getYear()));

        List<StatistiquesParAnneeDto> statsParAnnee = new ArrayList<>();

        for (Map.Entry<Integer, List<Designation>> entry : designationsParAnnee.entrySet()) {
            int annee = entry.getKey();
            List<Designation> dsgs = entry.getValue();

            StatistiquesParAnneeDto anneeStats = calculerStatsPourAnnee(annee, dsgs);
            statsParAnnee.add(anneeStats);
        }

        stats.setParAnnee(statsParAnnee);
        return stats;
    }

    private StatistiquesParAnneeDto calculerStatsPourAnnee(int annee, List<Designation> designations) {
        StatistiquesParAnneeDto stats = new StatistiquesParAnneeDto();
        stats.setAnnee(annee);
        stats.setMatchs(designations.size());
        stats.setKm(designations.stream().mapToDouble(Designation::getKmParcourus).sum());
        stats.setRevenus(designations.stream().mapToDouble(Designation::getRevenus).sum());

        Map<String, Integer> salleFrequency = new HashMap<>();
        Map<String, Integer> equipeFrequency = new HashMap<>();
        Map<String, Integer> collegueFrequency = new HashMap<>();
        Map<Integer, StatistiquesParMoisDto> parMois = new TreeMap<>();

        for (Designation d : designations) {
            LocalDate date = d.getDate();
            int mois = date.getMonthValue();

            // Mois
            StatistiquesParMoisDto moisStats = parMois.computeIfAbsent(mois, m -> new StatistiquesParMoisDto());
            moisStats.setMois(mois);
            moisStats.incrementMatchs();
            moisStats.incrementKm(d.getKmParcourus());
            moisStats.incrementRevenus(d.getRevenus());

            // Salle + ville
            String salle = d.getSalle();
            if (salle != null) {
                salleFrequency.merge(salle + " - " + d.getVille(), 1, Integer::sum);
                moisStats.incrementSalle(salle + " - " + d.getVille());
            }

            // Équipes
            if (d.getEquipeA() != null) {
                equipeFrequency.merge(d.getEquipeA(), 1, Integer::sum);
                moisStats.incrementEquipe(d.getEquipeA());
            }
            if (d.getEquipeB() != null) {
                equipeFrequency.merge(d.getEquipeB(), 1, Integer::sum);
                moisStats.incrementEquipe(d.getEquipeB());
            }

            // Collègue
            if (d.getCollegue() != null) {
                String collegueNom = d.getCollegue().getNom() + " " + d.getCollegue().getPrenom();
                collegueFrequency.merge(collegueNom, 1, Integer::sum);
                moisStats.incrementCollegue(collegueNom);
            }
        }

        // Éléments favoris
        stats.setSallePreferee(getMaxKey(salleFrequency));
        stats.setEquipeFavorite(getMaxKey(equipeFrequency));
        stats.setCollegueFavori(getMaxKey(collegueFrequency));

        // Nombre de matchs avec ce collègue
        if (stats.getCollegueFavori() != null) {
            stats.setMatchsAvecCollegueFavori(collegueFrequency.get(stats.getCollegueFavori()));
        }

        stats.setParMois(new ArrayList<>(parMois.values()));
        return stats;
    }

    private String getMaxKey(Map<String, Integer> map) {
        return map.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }
}
