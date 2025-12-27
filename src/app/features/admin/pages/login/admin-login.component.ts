import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Get return URL from route parameters or default to admin dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';

    // Redirect if already authenticated
    if (this.adminService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }


  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.adminService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          // Successful login
          this.router.navigate([this.returnUrl]);
        } else {
          // Login failed
          this.errorMessage = response.message;
          this.shakeForm();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        this.shakeForm();
        console.error('Login error:', error);
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private shakeForm(): void {
    const formElement = document.querySelector('.login-form');
    if (formElement) {
      formElement.classList.add('shake');
      setTimeout(() => {
        formElement.classList.remove('shake');
      }, 600);
    }
  }

  // Forgot password (placeholder)
  onForgotPassword(): void {
    // Implement forgot password functionality
    alert('Forgot password functionality will be implemented soon.');
  }
}
