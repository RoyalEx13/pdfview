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
  const url = 'https://bananacoding-my.sharepoint.com/personal/worachet_bananacoding_com/_layouts/15/download.aspx?UniqueId=391f73a0-4806-4bdb-9d1f-3336022ab2ac&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJmYTk4Nzg3Yy1mZTU0LTQxYmQtODBlOC0zZmNiNDA4M2NhYjgiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYmFuYW5hY29kaW5nLW15LnNoYXJlcG9pbnQuY29tQGM3MGFkN2E3LTMyOTctNDljYy1hYTA1LTcyNWRkY2I1Zjg3MCIsImV4cCI6IjE3NTQ1NTQ2NjcifQ.CgoKBHNuaWQSAjQzEgsIhIm9tpHjqj4QBRoOMTgzLjg4LjI0NC4xMjEiFG1pY3Jvc29mdC5zaGFyZXBvaW50KixLSWk1MktZWmJySGllampQWktUaE5iQ3gzUUxxZjZLMWxVUzlZWTZMc3hjPTChATgBQhChuVkXvwAAUL6OpECfTdu1ShBoYXNoZWRwcm9vZnRva2VuUghbImttc2kiXWIEdHJ1ZWokMDAyMTcyOTktMzljMS1jMDQwLWFlNGUtODQ4MTVlMGQwNjNicikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDI5ODU5NTlmYkBsaXZlLmNvbXoBMMIBKTAjLmZ8bWVtYmVyc2hpcHx3b3JhY2hldEBiYW5hbmFjb2RpbmcuY29tyAEB4gEWYkRlN3dJNlNIVS00SFNoVkZjWUtBQQ.e8ovWMh6mdkHQ0wwvuqCGepBgqNq9aETAji9yl0qQGA'

  return this.http.get(url,{
    params,
    responseType: 'blob'
  });
}

}
