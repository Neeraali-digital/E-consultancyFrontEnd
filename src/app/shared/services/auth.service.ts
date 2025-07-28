import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  requireAuth(): boolean {
    if (!this.isAuthenticated()) {
      return false; // Will trigger login modal
    }
    return true;
  }
}