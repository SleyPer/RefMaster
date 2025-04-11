package com.example.ref_master_backend.service;

import com.example.ref_master_backend.entity.Arbitre;
import com.example.ref_master_backend.repository.ArbitreRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ArbitreService {

    private ArbitreRepository arbitreRepository;

    public List<Arbitre> getAll() {
        return arbitreRepository.findAll();
    }

    public Arbitre save(Arbitre arbitre) {
        return arbitreRepository.save(arbitre);
    }
}
