import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl = 'http://localhost:8080/api/designations';

  constructor(private http: HttpClient) { }

  getDesignations(): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.apiUrl);
  }

  createDesignation(designation: Designation): Observable<Designation> {
    return this.http.post<Designation>(this.apiUrl, designation);
  }

}
