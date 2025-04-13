import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatistiquesGlobalesDto } from '../models/statistiques.model';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private apiUrl = 'http://localhost:8080/api/statistiques';

  constructor(private http: HttpClient) { }

  getStatistiques(): Observable<StatistiquesGlobalesDto> {
    return this.http.get<StatistiquesGlobalesDto>(this.apiUrl);
  }
}
