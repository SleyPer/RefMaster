import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';
import { Arbitre } from 'src/app/models/arbitre.model';
import { ArbitreService } from 'src/app/services/arbitre.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {
  designations: Designation[] = [];
  arbitres: Arbitre[] = [];
  newDesignation: Designation = {
    date: '',
    division: '',
    equipeA: '',
    equipeB: '',
    salle: '',
    ville: '',
    collegue: null as any,
    kmParcourus: 0,
    revenus: 0
  };

  isModalOpen: boolean = false;

  constructor(
    private designationService: DesignationService,
    private arbitreService: ArbitreService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDesignations();
    this.getArbitres();
  }

  getDesignations(): void {
    this.designationService.getDesignations().subscribe((designations: Designation[]) => {
      this.designations = designations;
    });
  }

  getArbitres(): void {
    this.arbitreService.getArbitres().subscribe(data => {
      this.arbitres = data;
    });
  }

  openCreateModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createDesignation(): void {
    this.designationService.createDesignation(this.newDesignation).subscribe({
      next: (response: Designation) => {
        this.designations.push(response);
        this.closeModal();
        this.toastr.success('Désignation créée avec succès!');
      },
      error: () => {
        this.toastr.error('Erreur lors de la création de la désignation');
      }
    });
  }

}
