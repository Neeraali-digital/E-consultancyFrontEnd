import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

export interface DashboardStats {
  totalColleges: number;
  totalCourses: number;
  totalUsers: number;
  totalInquiries: number;
  monthlyGrowth: {
    colleges: number;
    courses: number;
    users: number;
    inquiries: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentUserSubject = new BehaviorSubject<AdminUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage)
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string; user?: AdminUser }> {
    // Mock authentication - replace with actual API call
    return of({ email, password }).pipe(
      delay(1000), // Simulate API delay
      map(() => {
        // Mock validation
        if (email === 'admin@wayzon.edu' && password === 'admin123') {
          const user: AdminUser = {
            id: '1',
            name: 'Admin User',
            email: 'admin@wayzon.edu',
            role: 'Super Administrator',
            permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings']
          };

          // Store in localStorage
          localStorage.setItem('admin_token', 'mock_jwt_token_' + Date.now());
          localStorage.setItem('admin_user', JSON.stringify(user));

          // Update subjects
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          return { success: true, message: 'Login successful', user };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getDashboardStats(): Observable<DashboardStats> {
    // Mock data - replace with actual API call
    const stats: DashboardStats = {
      totalColleges: 245,
      totalCourses: 1250,
      totalUsers: 15420,
      totalInquiries: 89,
      monthlyGrowth: {
        colleges: 12,
        courses: 45,
        users: 234,
        inquiries: 23
      }
    };

    return of(stats).pipe(delay(500));
  }

  getChartData(): Observable<any> {
    // Mock chart data - replace with actual API call
    const chartData = {
      userGrowth: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Users',
          data: [120, 190, 300, 500, 200, 300],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          fill: true
        }]
      },
      collegeDistribution: {
        labels: ['Engineering', 'Medical', 'Management', 'Arts', 'Science'],
        datasets: [{
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ]
        }]
      },
      inquiryTrends: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Inquiries',
          data: [25, 35, 28, 42],
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          fill: true
        }]
      }
    };

    return of(chartData).pipe(delay(300));
  }

  // Permission checking methods
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) || false;
  }

  canRead(): boolean {
    return this.hasPermission('read');
  }

  canWrite(): boolean {
    return this.hasPermission('write');
  }

  canDelete(): boolean {
    return this.hasPermission('delete');
  }

  canManageUsers(): boolean {
    return this.hasPermission('manage_users');
  }

  canManageSettings(): boolean {
    return this.hasPermission('manage_settings');
  }
}
