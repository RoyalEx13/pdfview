import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OnedrivePdfService {
  constructor(private http: HttpClient) {}

  fetchPdfUrl(documentName: string): Observable<Blob> {
  const params = new HttpParams().set('name', documentName);
  const body = { name: documentName };
  const pdf = '/src/assets/pdfs/{{documentName}}.pdf'

  // return this.http.post(environment.onedrivePdfApiUrl, body, {
  //   params,
  //   responseType: 'blob'
  // });
  const pdfUrl = `assets/pdfs/${documentName}.pdf`;
    return this.http.get(pdfUrl, { responseType: 'blob' });

}

}
