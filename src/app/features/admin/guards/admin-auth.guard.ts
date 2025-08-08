import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if admin token exists and is valid
    const adminToken = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    
    if (adminToken && adminUser) {
      return true;
    } else {
      // Clear any invalid tokens
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      
      // Redirect to admin login page
      this.router.navigate(['/admin/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
