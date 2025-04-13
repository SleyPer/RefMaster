import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from 'src/app/services/statistiques.service';
import { StatistiquesGlobalesDto, StatistiquesParAnneeDto } from 'src/app/models/statistiques.model';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  statsGlobales!: StatistiquesGlobalesDto;
  statsParAnnee: StatistiquesParAnneeDto[] = [];

  readonly moisNoms = [
    '', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  constructor(private statistiquesService: StatistiquesService) { }

  ngOnInit(): void {
    this.statistiquesService.getStatistiques().subscribe(stats => {
      this.statsGlobales = stats;
      this.statsParAnnee = stats.parAnnee.sort((a, b) => a.annee - b.annee);
    });
  }
}
