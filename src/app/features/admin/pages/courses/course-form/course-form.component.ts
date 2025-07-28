import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AlertService } from '../../../shared/services/alert.service';
// Using hardcoded API URL
const API_URL = 'http://127.0.0.1:8000/api';

export interface Course {
  id?: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degree_type: string;
  description: string;
  eligibility: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSubmitting = false;
  courseId: string | null = null;
  successMessage = '';
  errorMessage = '';

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
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.courseId;

    if (this.isEditMode) {
      this.loadCourse();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      category: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      degree_type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      eligibility: ['', [Validators.required]],
      status: ['active']
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  private loadCourse(): void {
    this.isLoading = true;
    
    const sub = this.http.get(`${API_URL}/courses/${this.courseId}/`).subscribe({
      next: (course: any) => {
        if (course) {
          this.courseForm.patchValue(course);
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading course:', error);
        this.errorMessage = 'Failed to load course data';
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form valid:', this.courseForm.valid);
    console.log('Form value:', this.courseForm.value);
    console.log('Form errors:', this.getFormErrors());
    
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const courseData: Course = {
        ...this.courseForm.value,
        id: this.isEditMode ? this.courseId : undefined
      };
      
      console.log('Sending course data:', courseData);

      const apiCall = this.isEditMode 
        ? this.http.put(`${API_URL}/courses/${this.courseId}/`, courseData)
        : this.http.post(`${API_URL}/courses/`, courseData);

      const sub = apiCall.subscribe({
        next: (response: any) => {
          console.log(this.isEditMode ? 'Course updated successfully!' : 'Course created successfully!');
          this.isSubmitting = false;
          this.router.navigate(['/admin/courses']);
        },
        error: (error: any) => {
          console.error('Error saving course. Please try again.');
          this.isSubmitting = false;
        }
      });
      
      this.subscription.add(sub);
    } else {
      console.log('Form is invalid, marking fields as touched');
      this.markFormGroupTouched();
    }
  }
  
  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/courses']);
  }
}
