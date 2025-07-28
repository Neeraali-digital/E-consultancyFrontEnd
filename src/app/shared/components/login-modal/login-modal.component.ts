import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';

const API_URL = 'http://127.0.0.1:8000/api';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold text-center mb-6">Login Required</h2>
        <p class="text-gray-600 text-center mb-6">Please login to continue</p>
        
        <button 
          (click)="loginWithGoogle()"
          class="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button 
          (click)="close()"
          class="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  `
})
export class LoginModalComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() modalClose = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  loginWithGoogle() {
    // Mock Google login - replace with actual Google OAuth
    this.http.post(`${API_URL}/auth/google/`, {}).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.alertService.success('Login successful!');
        this.loginSuccess.emit();
      },
      error: (error) => {
        this.alertService.error('Login failed. Please try again.');
      }
    });
  }

  close() {
    this.modalClose.emit();
  }
}