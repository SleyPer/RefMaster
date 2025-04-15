import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  showScrollBottomButton = true;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  private destroy$ = new Subject<void>();

  constructor(
    private designationService: DesignationService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  ngAfterViewInit(): void {
    this.tableWrapper.nativeElement.addEventListener('scroll', () => this.onTableScroll());
  }

  onTableScroll(): void {
    const el = this.tableWrapper.nativeElement;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    this.showScrollTopButton = scrollTop > 100;
    this.showScrollBottomButton = scrollTop + clientHeight < scrollHeight - 200;
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

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const direction = this.sortDirection === 'asc' ? 1 : -1;

    const sortFn = (a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA == null) return -1 * direction;
      if (valueB == null) return 1 * direction;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * direction;
      }

      return (valueA > valueB ? 1 : -1) * direction;
    };

    this.pastDesignations.sort(sortFn);
    this.futureDesignations.sort(sortFn);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
