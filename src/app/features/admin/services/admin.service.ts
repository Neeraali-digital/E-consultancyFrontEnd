import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';

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

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
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
    return this.apiService.login({ username: email, password }).pipe(
      map((response: any) => {
        if (response.token && response.user) {
          const user: AdminUser = {
            id: response.user.id.toString(),
            name: `${response.user.first_name} ${response.user.last_name}`,
            email: response.user.email,
            role: response.user.role === 'admin' ? 'Administrator' : response.user.role,
            permissions: response.user.role === 'admin' ? 
              ['read', 'write', 'delete', 'manage_users', 'manage_settings'] : 
              ['read']
          };

          // Store admin-specific data
          localStorage.setItem('admin_token', response.token);
          localStorage.setItem('admin_user', JSON.stringify(user));

          // Update subjects
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          return { success: true, message: 'Login successful', user };
        } else {
          return { success: false, message: 'Invalid credentials' };
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
    return this.apiService.getDashboardStats().pipe(
      map(response => ({
        totalColleges: response.total_colleges || 0,
        totalCourses: response.total_courses || 0,
        totalUsers: response.total_students || 0,
        totalInquiries: response.total_applications || 0,
        monthlyGrowth: {
          colleges: response.monthly_growth?.colleges || 0,
          courses: response.monthly_growth?.courses || 0,
          users: response.monthly_growth?.students || 0,
          inquiries: response.monthly_growth?.applications || 0
        }
      }))
    );
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
