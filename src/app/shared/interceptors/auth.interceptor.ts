import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define public endpoints that don't need authentication
    const publicEndpoints = ['/courses', '/colleges', '/blogs', '/reviews', '/search'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint));
    
    // Skip adding auth headers for public endpoints
    if (isPublicEndpoint) {
      return next.handle(req);
    }
    
    // Only add auth header for admin API calls
    if (req.url.includes('/admin/') || req.url.includes('/api/admin/') || req.url.includes('/auth/')) {
      const adminToken = localStorage.getItem('admin_token');
      if (adminToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Token ${adminToken}`
          }
        });
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Only redirect to admin login if it's an admin route
          if (req.url.includes('/admin/') || req.url.includes('/api/admin/')) {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            this.router.navigate(['/admin/login']);
          }
        }
        return throwError(() => error);
      })
    );
  }
}