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
    return this.http.post<Designation>(this.apiUrl, designation);
  }

  updateDesignation(designation: Designation): Observable<Designation> {
    return this.http.put<Designation>(this.apiUrl, designation);
  }

  deleteDesignation(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }
}
