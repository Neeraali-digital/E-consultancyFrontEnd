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
  image?: string;
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
  imagePreview: string | null = null;
  selectedImageFile: File | null = null;

  availableColleges: any[] = [];

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

    this.loadColleges();

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
      status: ['active'],
      colleges: [[]] // Multi-select for colleges
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  private loadColleges(): void {
    this.http.get<any[]>(`${API_URL}/colleges/`).subscribe({
      next: (colleges) => {
        this.availableColleges = colleges;
      },
      error: (err) => {
        console.error('Failed to load colleges', err);
      }
    });
  }

  private loadCourse(): void {
    this.isLoading = true;

    const sub = this.http.get(`${API_URL}/courses/${this.courseId}/`).subscribe({
      next: (course: any) => {
        if (course) {
          const formData = {
            ...course,
            colleges: course.colleges ? course.colleges.map((c: any) => c.id) : []
          };
          this.courseForm.patchValue(formData);
          if (course.image) {
            this.imagePreview = course.image;
          }
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
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = new FormData();
      Object.keys(this.courseForm.value).forEach(key => {
        if (key === 'colleges') {
          // Send college_ids as separate fields or as a list depending on backend expectation.
          // Since it's a ManyToMany field and we used PrimaryKeyRelatedField(many=True), 
          // we usually send multiple values for the same key 'college_ids'.
          const colleges = this.courseForm.value[key];
          if (Array.isArray(colleges)) {
            colleges.forEach(id => formData.append('college_ids', id));
          }
        } else {
          formData.append(key, this.courseForm.value[key]);
        }
      });

      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile);
      }

      const apiCall = this.isEditMode
        ? this.http.put(`${API_URL}/courses/${this.courseId}/`, formData)
        : this.http.post(`${API_URL}/courses/`, formData);

      const sub = apiCall.subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.router.navigate(['/admin/courses']);
        },
        error: (error: any) => {
          console.error('Error saving course:', error);
          this.errorMessage = 'Error saving course. Please try again.';
          this.isSubmitting = false;
        }
      });

      this.subscription.add(sub);
    } else {
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

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/courses']);
  }
}
