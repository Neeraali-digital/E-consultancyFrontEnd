import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import { AlertService } from '../../../../shared/services/alert.service';

const API_URL = 'http://127.0.0.1:8000/api';

@Component({
  selector: 'app-college-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit College' : 'Add College' }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <form [formGroup]="collegeForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">College Name *</label>
            <input formControlName="name" type="text" class="w-full border rounded-lg px-3 py-2"
                   [class.border-red-500]="collegeForm.get('name')?.invalid && collegeForm.get('name')?.touched">
            <div *ngIf="collegeForm.get('name')?.invalid && collegeForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
              College name is required
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Short Name *</label>
            <input formControlName="short_name" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select formControlName="type" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Type</option>
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
              <option value="management">Management</option>
              <option value="arts">Arts & Science</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input formControlName="location" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Established Year *</label>
            <input formControlName="established" type="number" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ranking</label>
            <input formControlName="ranking" type="number" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Institution Type *</label>
            <select formControlName="institution_type" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Type</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="deemed">Deemed</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Affiliated To</label>
            <input formControlName="affiliated" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <input formControlName="rating" type="number" step="0.1" min="0" max="5" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select formControlName="status" class="w-full border rounded-lg px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">College Image</label>
          <input type="file" (change)="onImageSelect($event)" accept="image/*" 
                 class="w-full border rounded-lg px-3 py-2">
          <div *ngIf="selectedImage" class="mt-2">
            <img [src]="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg">
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Courses Offered</label>
          <textarea formControlName="courses" rows="3" placeholder="Enter courses separated by commas" 
                    class="w-full border rounded-lg px-3 py-2"></textarea>
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
export class CollegeFormComponent implements OnInit, OnDestroy {
  collegeForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSubmitting = false;
  collegeId: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private alertService: AlertService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.collegeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.collegeId;

    if (this.isEditMode) {
      this.loadCollege();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.collegeForm = this.fb.group({
      name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      location: ['', [Validators.required]],
      established: ['', [Validators.required]],
      ranking: [0],
      institution_type: ['', [Validators.required]],
      affiliated: [''],
      rating: [0],
      courses: [''],
      status: ['active'],
      image: [null]
    });
  }

  private loadCollege(): void {
    this.isLoading = true;
    
    const sub = this.http.get(`${API_URL}/colleges/${this.collegeId}/`).subscribe({
      next: (college: any) => {
        if (college) {
          // Convert courses array to comma-separated string
          const formData = {
            ...college,
            courses: Array.isArray(college.courses) ? college.courses.join(', ') : college.courses
          };
          this.collegeForm.patchValue(formData);
          
          // Set image preview if exists
          if (college.image) {
            this.imagePreview = college.image;
          }
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Failed to load college data');
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form valid:', this.collegeForm.valid);
    console.log('Form value:', this.collegeForm.value);
    console.log('Form errors:', this.getFormErrors());
    
    // Remove validation check temporarily
    // if (this.collegeForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      
      // Add form fields
      Object.keys(this.collegeForm.value).forEach(key => {
        if (key === 'courses') {
          const courses = this.collegeForm.value[key];
          if (courses) {
            const courseArray = courses.split(',').map((course: string) => course.trim());
            formData.append('courses', JSON.stringify(courseArray));
          }
        } else if (key !== 'image') {
          formData.append(key, this.collegeForm.value[key]);
        }
      });
      
      // Add image if selected
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      console.log('Sending request to:', this.isEditMode ? `PUT ${API_URL}/colleges/${this.collegeId}/` : `POST ${API_URL}/colleges/`);

      const apiCall = this.isEditMode 
        ? this.http.put(`${API_URL}/colleges/${this.collegeId}/`, formData)
        : this.http.post(`${API_URL}/colleges/`, formData);

      const sub = apiCall.subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          alert(this.isEditMode ? 'College updated successfully!' : 'College created successfully!');
          this.isSubmitting = false;
          this.router.navigate(['/admin/colleges']);
        },
        error: (error: any) => {
          console.error('API Error:', error);
          alert('Error saving college: ' + (error.error?.message || error.message || 'Unknown error'));
          this.isSubmitting = false;
        }
      });
      
      this.subscription.add(sub);
    // } else {
    //   console.log('Form is invalid');
    //   this.markFormGroupTouched();
    // }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.collegeForm.controls).forEach(key => {
      const control = this.collegeForm.get(key);
      control?.markAsTouched();
    });
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.collegeForm.controls).forEach(key => {
      const control = this.collegeForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
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
    this.router.navigate(['/admin/colleges']);
  }
}