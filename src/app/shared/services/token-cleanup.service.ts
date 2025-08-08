import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenCleanupService {

  constructor() {
    this.cleanupConflictingTokens();
  }

  private cleanupConflictingTokens(): void {
    // Remove any conflicting tokens on app initialization
    const adminToken = localStorage.getItem('admin_token');
    const userToken = localStorage.getItem('token');
    
    // If both tokens exist, prioritize admin token and remove user token
    if (adminToken && userToken) {
      localStorage.removeItem('token');
    }
  }

  clearAllTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  clearUserTokens(): void {
    localStorage.removeItem('token');
  }

  clearAdminTokens(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}