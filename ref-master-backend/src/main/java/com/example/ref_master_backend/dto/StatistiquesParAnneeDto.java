package com.example.ref_master_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class StatistiquesParAnneeDto {
    private int annee;
    private int matchs;
    private double km;
    private double revenus;

    private String sallePreferee;
    private String equipeFavorite;
    private String collegueFavori;
    private Integer matchsAvecCollegueFavori;

    private List<StatistiquesParMoisDto> parMois;

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
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

    public String getSallePreferee() {
        return sallePreferee;
    }

    public void setSallePreferee(String sallePreferee) {
        this.sallePreferee = sallePreferee;
    }

    public String getEquipeFavorite() {
        return equipeFavorite;
    }

    public void setEquipeFavorite(String equipeFavorite) {
        this.equipeFavorite = equipeFavorite;
    }

    public String getCollegueFavori() {
        return collegueFavori;
    }

    public void setCollegueFavori(String collegueFavori) {
        this.collegueFavori = collegueFavori;
    }

    public Integer getMatchsAvecCollegueFavori() {
        return matchsAvecCollegueFavori;
    }

    public void setMatchsAvecCollegueFavori(Integer matchsAvecCollegueFavori) {
        this.matchsAvecCollegueFavori = matchsAvecCollegueFavori;
    }

    public List<StatistiquesParMoisDto> getParMois() {
        return parMois;
    }

    public void setParMois(List<StatistiquesParMoisDto> parMois) {
        this.parMois = parMois;
    }
}
