package com.example.ref_master_backend.repository;

import com.example.ref_master_backend.entity.Arbitre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArbitreRepository extends JpaRepository<Arbitre, Long> {
    Optional<Arbitre> findByNomAndPrenom(String nom, String prenom);
}
