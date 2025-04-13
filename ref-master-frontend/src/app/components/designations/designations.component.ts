import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit, OnDestroy {
  designations: Designation[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private designationService: DesignationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  getDesignations(): void {
    this.designationService.getDesignations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((designations: Designation[]) => {
        this.designations = designations;
      });
  }

  onUploadFinish(): void {
    this.getDesignations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
