import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = '/match';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createMatch(match: any): Observable<any> {
    return this.http.post(this.apiUrl, match);
  }
}
