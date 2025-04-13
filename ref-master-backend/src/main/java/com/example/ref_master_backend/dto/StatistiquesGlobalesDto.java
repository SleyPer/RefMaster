package com.example.ref_master_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatistiquesGlobalesDto {
    private int totalMatchs;
    private double totalKm;
    private double totalRevenus;
    private List<StatistiquesParAnneeDto> parAnnee;

    public int getTotalMatchs() {
        return totalMatchs;
    }

    public void setTotalMatchs(int totalMatchs) {
        this.totalMatchs = totalMatchs;
    }

    public double getTotalKm() {
        return totalKm;
    }

    public void setTotalKm(double totalKm) {
        this.totalKm = totalKm;
    }

    public double getTotalRevenus() {
        return totalRevenus;
    }

    public void setTotalRevenus(double totalRevenus) {
        this.totalRevenus = totalRevenus;
    }

    public List<StatistiquesParAnneeDto> getParAnnee() {
        return parAnnee;
    }

    public void setParAnnee(List<StatistiquesParAnneeDto> parAnnee) {
        this.parAnnee = parAnnee;
    }
}
