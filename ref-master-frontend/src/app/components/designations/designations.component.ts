import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';
import { Subject, takeUntil } from 'rxjs';
import { ListeDesignations } from 'src/app/models/liste-designations.model';
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss'],
})
export class DesignationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;

  designations!: ListeDesignations;
  pastDesignations: Designation[] = [];
  futureDesignations: Designation[] = [];

  showScrollTopButton = false;
  showScrollBottomButton = true;

  columns: { key: keyof Designation; label: string }[] = [
    { key: 'date', label: 'Date' },
    { key: 'division', label: 'Division' },
    { key: 'equipeA', label: 'Equipe A' },
    { key: 'equipeB', label: 'Equipe B' },
    { key: 'salle', label: 'Salle' },
    { key: 'ville', label: 'Ville' },
    { key: 'collegue', label: 'Collègue' },
    { key: 'kmParcourus', label: 'Kilomètres' },
    { key: 'revenus', label: 'Revenus' }
  ];

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly designationService: DesignationService,
    private readonly contentService: ContentService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  ngAfterViewInit(): void {
    this.tableWrapper?.nativeElement.addEventListener('scroll', () => this.onTableScroll());
  }

  private onTableScroll(): void {
    const { scrollTop, scrollHeight, clientHeight } = this.tableWrapper.nativeElement;

    this.showScrollTopButton = scrollTop > 100;
    this.showScrollBottomButton = scrollTop + clientHeight < scrollHeight - 200;
  }

  scrollToTop(): void {
    document.querySelector('.scroll-top-btn')?.classList.add('shake');
    setTimeout(() => document.querySelector('.scroll-top-btn')?.classList.remove('shake'), 400);

    this.tableWrapper?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.contentService.scrollToTop();
  }

  scrollToBottom(): void {
    const el = this.tableWrapper?.nativeElement;
    el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    this.contentService.scrollToBottom();
  }

  private getDesignations(): void {
    this.designationService
      .getDesignations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ListeDesignations) => {
        this.designations = data;
        this.pastDesignations = data.past;
        this.futureDesignations = data.future;
      });
  }

  onUploadFinish(): void {
    this.getDesignations();
    setTimeout(() => this.scrollToBottom(), 300);
  }

  sortBy(column: keyof Designation): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const direction = this.sortDirection === 'asc' ? 1 : -1;

    const comparator = (a: Designation, b: Designation): number => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA == null) return -1 * direction;
      if (valueB == null) return 1 * direction;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * direction;
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      }

      return 0;
    };

    this.pastDesignations.sort(comparator);
    this.futureDesignations.sort(comparator);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  goToDesignationDetails(id: number) {
    this.router.navigate(['/designation', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
