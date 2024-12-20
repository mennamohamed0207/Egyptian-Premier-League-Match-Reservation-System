import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/user';

  constructor(private http: HttpClient) { }

  updateUser(username: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}`, data);
  }

  getUsers(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}/users`);
  }

  changePassword(username: string, passwordData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${username}/change-password`,
      passwordData
    );
  }
  signup(user: any): Observable<any> {
    console.log(user);

    return this.http.post(`http://localhost:3000/user/signup`, user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
  getUser(username: any): Observable<any> {

    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);

    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');

    return this.http.get(`http://localhost:3000/user/${username}`, { headers });
  }
  getReservations(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);

    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');

    return this.http.get(`http://localhost:3000/ticket`, { headers });
  }
  updateProfile(username: any, data: any): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval logic
    console.log(token);
    console.log("user");
    console.log(data);
    const headers = new HttpHeaders().set('JWT-Token', `${token}`).set('Content-Type', 'application/json');

    return this.http.put(`http://localhost:3000/user/${username}/edit`, data, { headers });
  }
}
