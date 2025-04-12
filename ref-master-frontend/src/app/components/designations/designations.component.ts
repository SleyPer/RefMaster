import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {

  designations: Designation[] = [];
  newDesignation: Designation = {
    date: '',
    division: '',
    equipeA: '',
    equipeB: '',
    salle: '',
    ville: '',
    collegue: '',
    kmParcourus: 0,
    revenus: 0
  };

  isModalOpen: boolean = false;

  constructor(
    private designationService: DesignationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  getDesignations(): void {
    this.designationService.getDesignations().subscribe((designations: Designation[]) => {
      this.designations = designations;
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
