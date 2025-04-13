import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/models/designation.model';
import { ListeDesignations } from '../models/liste-designations.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl = 'http://localhost:8080/api/designations';

  constructor(private http: HttpClient) { }

  getDesignations(): Observable<ListeDesignations> {
    return this.http.get<ListeDesignations>(this.apiUrl);
  }

  createDesignation(designation: Designation): Observable<Designation> {
    const payload = {
      ...designation,
      collegue: {
        id: designation.collegue.id
      }
    };
    return this.http.post<Designation>(this.apiUrl, payload);
  }
}
