import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const pdf = '/src/assets/pdfs/{{documentName}}.pdf';

    const url = `https://furo-s3.s3.ap-southeast-1.amazonaws.com/${documentName}.pdf`;
    return this.http.get(url,{ responseType: 'blob' });
    // const pdfUrl = `assets/pdfs/${documentName}.pdf`;
    // return this.http.get(pdfUrl, { responseType: 'blob' });

  }
}
