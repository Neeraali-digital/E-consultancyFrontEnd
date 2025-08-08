import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    // If trying to access admin routes without proper authentication
    if (state.url.startsWith('/admin')) {
      const adminToken = localStorage.getItem('admin_token');
      if (!adminToken) {
        // Redirect to home instead of admin login for user navigation
        this.router.navigate(['/home']);
        return false;
      }
    }
    
    return true;
  }
}