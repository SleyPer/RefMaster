import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from 'src/app/services/statistiques.service';
import { StatistiquesGlobalesDto, StatistiquesParAnneeDto } from 'src/app/models/statistiques.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class StatistiquesComponent implements OnInit {
  statsGlobales!: StatistiquesGlobalesDto;
  statsParAnnee: StatistiquesParAnneeDto[] = [];

  readonly moisNoms = [
    '', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  anneesOuvertes: boolean[] = [];

  constructor(private statistiquesService: StatistiquesService) { }

  ngOnInit(): void {
    this.statistiquesService.getStatistiques().subscribe(stats => {
      this.statsGlobales = stats;
      this.statsParAnnee = stats.parAnnee.sort((a, b) => a.annee - b.annee);
    });

    this.anneesOuvertes = this.statsParAnnee.map(() => true);
  }

  toggleAnnee(index: number): void {
    this.anneesOuvertes[index] = !this.anneesOuvertes[index];
  }
}
