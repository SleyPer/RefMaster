package com.example.ref_master_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "arbitre")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Arbitre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private String club;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
