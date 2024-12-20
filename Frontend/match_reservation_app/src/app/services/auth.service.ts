import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://127.0.0.1:3000/user/login'
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private http: HttpClient, private _router: Router) {
    if (this.isLocalStorageAvailable) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.tokenSubject.next(token);
      }
    }
  }
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  login(loginForm: any): Observable<any> {
    console.log("in login");
    console.log(loginForm.value);

    return this.http.post<any>(this.loginUrl, loginForm.value).pipe(
      tap(res => {
        const token = res['token'];
        console.log(res);
        console.log(token);
        if (token) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('username', loginForm.value.user.username);
          this.tokenSubject.next(token);
        }
      })
    )
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getDecodedToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode(token);
    }
    return null
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username')
    this.tokenSubject.next(null);
    this._router.navigate(['/login'])
  }

}
