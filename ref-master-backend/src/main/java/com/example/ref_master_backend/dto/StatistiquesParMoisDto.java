package com.example.ref_master_backend.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class StatistiquesParMoisDto {
    private int mois;
    private int matchs = 0;
    private double km = 0;
    private double revenus = 0;

    private Map<String, Integer> salleFrequency = new HashMap<>();
    private Map<String, Integer> equipeFrequency = new HashMap<>();
    private Map<String, Integer> collegueFrequency = new HashMap<>();

    public int getMois() {
        return mois;
    }

    public void setMois(int mois) {
        this.mois = mois;
    }

    public int getMatchs() {
        return matchs;
    }

    public void setMatchs(int matchs) {
        this.matchs = matchs;
    }

    public double getKm() {
        return km;
    }

    public void setKm(double km) {
        this.km = km;
    }

    public double getRevenus() {
        return revenus;
    }

    public void setRevenus(double revenus) {
        this.revenus = revenus;
    }

    public Map<String, Integer> getSalleFrequency() {
        return salleFrequency;
    }

    public void setSalleFrequency(Map<String, Integer> salleFrequency) {
        this.salleFrequency = salleFrequency;
    }

    public Map<String, Integer> getEquipeFrequency() {
        return equipeFrequency;
    }

    public void setEquipeFrequency(Map<String, Integer> equipeFrequency) {
        this.equipeFrequency = equipeFrequency;
    }

    public Map<String, Integer> getCollegueFrequency() {
        return collegueFrequency;
    }

    public void setCollegueFrequency(Map<String, Integer> collegueFrequency) {
        this.collegueFrequency = collegueFrequency;
    }

    public void incrementMatchs() {
        this.matchs++;
    }

    public void incrementKm(double value) {
        this.km += value;
    }

    public void incrementRevenus(double value) {
        this.revenus += value;
    }

    public void incrementSalle(String salle) {
        this.salleFrequency.merge(salle, 1, Integer::sum);
    }

    public void incrementEquipe(String equipe) {
        this.equipeFrequency.merge(equipe, 1, Integer::sum);
    }

    public void incrementCollegue(String collegue) {
        this.collegueFrequency.merge(collegue, 1, Integer::sum);
    }
}
