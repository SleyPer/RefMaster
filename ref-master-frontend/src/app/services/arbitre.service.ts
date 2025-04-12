import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Arbitre {
  id: number;
  nom: string;
  prenom: string;
  club: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {
  private apiUrl = 'http://localhost:8080/api/arbitres'; // adapte selon ton setup Docker

  constructor(private http: HttpClient) { }

  getArbitres(): Observable<Arbitre[]> {
    return this.http.get<Arbitre[]>(this.apiUrl);
  }
}
