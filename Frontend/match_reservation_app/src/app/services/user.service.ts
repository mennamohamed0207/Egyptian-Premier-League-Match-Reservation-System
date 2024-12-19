import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/user';

  constructor(private http: HttpClient) {}

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
}
