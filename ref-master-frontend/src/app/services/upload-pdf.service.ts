import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8080/api/designations';

  constructor(private http: HttpClient) { }

  uploadPdf(files: File[]): Observable<Designation[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    return this.http.post<Designation[]>(this.apiUrl + '/upload-pdf', formData);
  }
}
