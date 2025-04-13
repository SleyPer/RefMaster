package com.example.ref_master_backend.repository;

import com.example.ref_master_backend.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignationRepository extends JpaRepository<Designation, Long> {
    List<Designation> findAllByOrderByDateAsc();
}