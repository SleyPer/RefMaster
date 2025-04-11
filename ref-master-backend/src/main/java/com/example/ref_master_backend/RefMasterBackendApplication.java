package com.example.ref_master_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class RefMasterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RefMasterBackendApplication.class, args);
	}

}
