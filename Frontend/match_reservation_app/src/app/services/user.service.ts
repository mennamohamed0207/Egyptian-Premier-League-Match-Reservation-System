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
}
