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

  onUploadFinish(): void {
    this.getDesignations();
  }
}
