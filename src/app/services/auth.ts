import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/auth/login`,
      data
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
