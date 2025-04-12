import { Component, OnInit } from '@angular/core';
import { ArbitreService, Arbitre } from './services/arbitre.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  arbitres: Arbitre[] = [];

  constructor(private arbitreService: ArbitreService) {}

  ngOnInit(): void {
    this.arbitreService.getArbitres().subscribe({
      next: (data) => this.arbitres = data,
      error: (err) => console.error('Erreur lors de la récupération des arbitres :', err)
    });
  }
}
