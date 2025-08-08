import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../shared/services/api.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit User' : 'Add User' }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input formControlName="first_name" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input formControlName="last_name" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input formControlName="email" type="email" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input formControlName="phone" type="tel" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select formControlName="role" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select formControlName="is_active" class="w-full border rounded-lg px-3 py-2">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          
          <div *ngIf="!isEditMode">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input formControlName="password" type="password" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div *ngIf="!isEditMode">
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
            <input formControlName="confirm_password" type="password" class="w-full border rounded-lg px-3 py-2">
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <input type="file" (change)="onImageSelect($event)" accept="image/*" class="w-full border rounded-lg px-3 py-2">
          <div *ngIf="imagePreview" class="mt-2">
            <img [src]="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg">
          </div>
        </div>

        <div class="flex gap-4 mt-8">
          <button type="submit" [disabled]="isSubmitting" 
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
          </button>
          <button type="button" (click)="onCancel()" 
                  class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  userId: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['', [Validators.required]],
      is_active: ['true'],
      password: [''],
      confirm_password: ['']
    });

    if (!this.isEditMode) {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('confirm_password')?.setValidators([Validators.required]);
    }
  }

  private loadUser(): void {
    const sub = this.apiService.getUser(Number(this.userId)).subscribe({
      next: (user: any) => {
        if (user) {
          this.userForm.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            is_active: user.is_active.toString()
          });
          
          if (user.profile_image) {
            this.imagePreview = user.profile_image;
          }
        }
      },
      error: (error: any) => {
        console.error('Failed to load user data');
      }
    });
    
    this.subscription.add(sub);
  }

  onSubmit(): void {
    if (this.userForm.get('password')?.value !== this.userForm.get('confirm_password')?.value) {
      alert('Passwords do not match');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    
    Object.keys(this.userForm.value).forEach(key => {
      if (key !== 'confirm_password' && this.userForm.value[key] !== '') {
        if (key === 'is_active') {
          formData.append(key, this.userForm.value[key] === 'true' ? 'true' : 'false');
        } else {
          formData.append(key, this.userForm.value[key]);
        }
      }
    });
    
    if (this.selectedImage) {
      formData.append('profile_image', this.selectedImage);
    }

    const apiCall = this.isEditMode 
      ? this.apiService.updateUser(Number(this.userId), formData)
      : this.apiService.createUser(formData);

    const sub = apiCall.subscribe({
      next: (response: any) => {
        console.log('User saved successfully:', response);
        alert(this.isEditMode ? 'User updated successfully!' : 'User created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/users']);
      },
      error: (error: any) => {
        console.error('Error saving user:', error);
        const errorMessage = error.error?.detail || error.error?.message || error.message || 'Unknown error';
        alert('Error saving user: ' + errorMessage);
        this.isSubmitting = false;
      }
    });
    
    this.subscription.add(sub);
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/users']);
  }
}