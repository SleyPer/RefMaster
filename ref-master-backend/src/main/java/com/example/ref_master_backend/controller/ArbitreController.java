package com.example.ref_master_backend.controller;

import com.example.ref_master_backend.entity.Arbitre;
import com.example.ref_master_backend.service.ArbitreService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/arbitres")
@AllArgsConstructor
public class ArbitreController {

    private ArbitreService arbitreService;

    @GetMapping
    public List<Arbitre> getAll() {
        return arbitreService.getAll();
    }

    @PostMapping("/create")
    public Arbitre create(@RequestBody Arbitre arbitre) {
        return arbitreService.save(arbitre);
    }

    @GetMapping("/test")
    public String test() {
        return "ArbitreController est en marche";
    }
}
