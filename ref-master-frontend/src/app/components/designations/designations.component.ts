import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';
import { Subject, takeUntil } from 'rxjs';
import { ListeDesignations } from 'src/app/models/liste-designations.model';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit, OnDestroy {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;

  designations!: ListeDesignations;
  pastDesignations: Designation[] = [];
  futureDesignations: Designation[] = [];

  showScrollTopButton = false;

  private destroy$ = new Subject<void>();

  constructor(
    private designationService: DesignationService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  ngAfterViewInit(): void {
    if (this.tableWrapper) {
      this.tableWrapper.nativeElement.addEventListener('scroll', () => {
        const scrollTop = this.tableWrapper.nativeElement.scrollTop;
        this.showScrollTopButton = scrollTop > 200;
      });
      setTimeout(() => this.scrollToBottom(), 400);
    }
  }

  scrollToBottom(): void {
    if (this.tableWrapper) {
      this.tableWrapper.nativeElement.scrollTo({
        top: this.tableWrapper.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    }

    // Scroll page
    this.contentService.scrollToBottom();
  }

  scrollToTop(): void {
    // Ajoute une petite secousse visuelle au bouton
    const button = document.querySelector('.scroll-top-btn');
    if (button) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 400);
    }

    // Scroll table
    const tableWrapper = this.tableWrapper?.nativeElement;
    if (tableWrapper) {
      tableWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll page
    this.contentService.scrollToTop();
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollContainer = this.tableWrapper?.nativeElement;
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      this.showScrollTopButton = scrollTop < scrollHeight - clientHeight - 200;
    }
  }

  getDesignations(): void {
    this.designationService.getDesignations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((designations: ListeDesignations) => {
        this.designations = designations;
        this.pastDesignations = designations.past;
        this.futureDesignations = designations.future;
      });
  }

  onUploadFinish(): void {
    this.getDesignations();
    setTimeout(() => this.scrollToBottom(), 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
