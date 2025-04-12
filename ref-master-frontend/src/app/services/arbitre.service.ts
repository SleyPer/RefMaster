import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arbitre } from '../models/arbitre.model';

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {
  private apiUrl = 'http://localhost:8080/api/arbitres';

  constructor(private http: HttpClient) { }

  getArbitres(): Observable<Arbitre[]> {
    return this.http.get<Arbitre[]>(this.apiUrl);
  }
}
