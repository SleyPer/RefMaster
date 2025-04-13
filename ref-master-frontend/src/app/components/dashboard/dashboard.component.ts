import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  globalStats = {
    totalMatchs: 52,
    totalKm: 1180,
    totalRevenus: 3520
  };

  nextDesignation = {
    date: '2025-04-21',
    salle: 'Gymnase Jean Moulin',
    ville: 'Lyon',
    equipeA: 'Lyon U15',
    equipeB: 'Grenoble U15',
    collegue: 'Martin Dupont'
  };

  lastDesignations = [
    { date: '2025-04-10', salle: 'Bercy', ville: 'Paris' },
    { date: '2025-04-05', salle: 'Palais des sports', ville: 'Marseille' },
    { date: '2025-03-29', salle: 'Stade couvert', ville: 'Lille' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
