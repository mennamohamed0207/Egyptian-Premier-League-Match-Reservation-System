import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = 'http://localhost:3000/match';
  private ticketUrl = 'http://localhost:3000/ticket'

  constructor(private http: HttpClient) { }

  getMatches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createMatch(match: any): Observable<any> {
    return this.http.post(this.apiUrl, match);
  }
  getMatch(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  reserveSeat(matchid: string, seats: any) {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);

    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');
    return this.http.post(`http://localhost:3000/ticket/675f89a67a7d9c29477df74c`, seats, { headers });
  }
  addMatch(match: any): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);
    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, match, { headers });
  }
  addStadium(stadium:any)
  {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);
    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/stadium', stadium, { headers });
  }
  getStadiums(): Observable<any> {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null; // Replace with your token retrieval logic
    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/stadium',{headers});
  }
}
