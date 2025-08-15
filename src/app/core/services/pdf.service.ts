import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}

  blobStorage(documentName: string): Observable<Blob> {
    const baseUrl = environment.blobStoragePdfUrl;
    const blobSasToken = environment.blobSasToken;

    const url = `${baseUrl}/${documentName}.pdf?${blobSasToken}`;
    return this.http.get(url,{ responseType: 'blob' });
  }
}
