import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Course {
  id?: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degreeType: string;
  description: string;
  eligibility: string;
  annualFee: number;
  totalFee: number;
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
    private route: ActivatedRoute
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
      degreeType: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      eligibility: ['', [Validators.required]],
      annualFee: [0, [Validators.required, Validators.min(1)]],
      totalFee: [0, [Validators.required, Validators.min(1)]],
      status: ['active']
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  private loadCourse(): void {
    this.isLoading = true;

    // Mock data loading - replace with actual service call
    setTimeout(() => {
      const mockCourse: Course = {
        id: this.courseId!,
        name: 'Bachelor of Technology in Computer Science',
        code: 'CSE101',
        category: 'engineering',
        duration: '4 Years',
        degreeType: 'undergraduate',
        description: 'A comprehensive program covering computer science fundamentals, programming, algorithms, and software development.',
        eligibility: '10+2 with Physics, Chemistry, Mathematics with minimum 60% marks',
        annualFee: 150000,
        totalFee: 600000,
        status: 'active'
      };

      this.courseForm.patchValue(mockCourse);
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const courseData: Course = {
        ...this.courseForm.value,
        id: this.isEditMode ? this.courseId : undefined
      };

      // Mock API call - replace with actual service
      setTimeout(() => {
        try {
          console.log('Course data:', courseData);

          this.successMessage = this.isEditMode
            ? 'Course updated successfully!'
            : 'Course created successfully!';

          this.isSubmitting = false;

          // Redirect after success
          setTimeout(() => {
            this.router.navigate(['/admin/courses']);
          }, 2000);

        } catch (error) {
          this.errorMessage = 'An error occurred while saving the course. Please try again.';
          this.isSubmitting = false;
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
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
