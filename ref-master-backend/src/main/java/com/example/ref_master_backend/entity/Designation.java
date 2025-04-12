package com.example.ref_master_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "designation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String division;
    private String equipeA;
    private String equipeB;
    private String salle;
    private String ville;
    @ManyToOne
    @JoinColumn(name = "collegue_id", referencedColumnName = "id")
    private Arbitre collegue;
    private double kmParcourus;
    private double revenus;

    public Arbitre getCollegue() {
        return collegue;
    }

    public void setCollegue(Arbitre collegue) {
        this.collegue = collegue;
    }
}
