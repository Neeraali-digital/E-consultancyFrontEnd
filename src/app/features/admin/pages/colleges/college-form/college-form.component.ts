import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CollegeService } from '../../../services/college.service';
import { College } from '../college-list/college-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-college-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './college-form.component.html',
  styleUrls: ['./college-form.component.scss']
})
export class CollegeFormComponent implements OnInit, OnDestroy {
  collegeForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  collegeId: string | null = null;
  errorMessage = '';
  successMessage = '';
  currentYear = new Date().getFullYear();

  private subscription = new Subscription();

  // Form options
  collegeTypes = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'management', label: 'Management' },
    { value: 'arts', label: 'Arts & Science' },
    { value: 'law', label: 'Law' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'veterinary', label: 'Veterinary' }
  ];

  availableCourses = [
    'B.Tech', 'M.Tech', 'MBBS', 'BDS', 'MBA', 'MCA', 'B.Sc', 'M.Sc',
    'B.Com', 'M.Com', 'BBA', 'B.A', 'M.A', 'LLB', 'LLM', 'B.Pharm',
    'M.Pharm', 'B.Ed', 'M.Ed', 'Diploma'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.collegeForm = this.createForm();
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

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      established: ['', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      description: [''],
      website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],

      rating: ['', [Validators.min(0), Validators.max(5)]],
      status: ['active', [Validators.required]],
      courses: this.formBuilder.array([]),
      image: ['']
    });
  }

  get coursesArray(): FormArray {
    return this.collegeForm.get('courses') as FormArray;
  }

  get f() {
    return this.collegeForm.controls;
  }

  private loadCollege(): void {
    if (!this.collegeId) return;

    this.isLoading = true;
    this.subscription.add(
      this.collegeService.getCollege(this.collegeId).subscribe({
        next: (college) => {
          this.populateForm(college);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading college:', error);
          this.errorMessage = 'Error loading college data';
          this.isLoading = false;
        }
      })
    );
  }

  private populateForm(college: College): void {
    // Clear existing courses
    while (this.coursesArray.length !== 0) {
      this.coursesArray.removeAt(0);
    }

    // Add courses
    college.courses.forEach(course => {
      this.coursesArray.push(this.formBuilder.control(course, Validators.required));
    });

    // Populate form
    this.collegeForm.patchValue({
      name: college.name,
      location: college.location,
      type: college.type,
      established: college.established,
      description: college.description || '',
      website: college.website || '',
      email: college.email || '',
      phone: college.phone || '',

      rating: college.rating,
      status: college.status,
      image: college.image || ''
    });
  }

  addCourse(): void {
    this.coursesArray.push(this.formBuilder.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.coursesArray.removeAt(index);
  }

  selectCourse(course: string, index: number): void {
    this.coursesArray.at(index).setValue(course);
  }

  onSubmit(): void {
    if (this.collegeForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.collegeForm.value;
    


    const collegeData: Partial<College> = {
      ...formData,
      id: this.collegeId || undefined
    };

    const operation = this.isEditMode
      ? this.collegeService.updateCollege(this.collegeId!, collegeData)
      : this.collegeService.createCollege(collegeData);

    this.subscription.add(
      operation.subscribe({
        next: (result) => {
          this.isSaving = false;
          this.successMessage = `College ${this.isEditMode ? 'updated' : 'created'} successfully!`;
          
          setTimeout(() => {
            this.router.navigate(['/admin/colleges']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error saving college:', error);
          this.errorMessage = `Error ${this.isEditMode ? 'updating' : 'creating'} college. Please try again.`;
          this.isSaving = false;
        }
      })
    );
  }

  private markFormGroupTouched(): void {
    Object.keys(this.collegeForm.controls).forEach(key => {
      const control = this.collegeForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach(c => c.markAsTouched());
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/colleges']);
  }

  // File upload handler
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.collegeForm.patchValue({
          image: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Helper methods for validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.collegeForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.collegeForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['pattern']) return `Invalid ${fieldName} format`;
      if (field.errors['min']) return `${fieldName} value is too low`;
      if (field.errors['max']) return `${fieldName} value is too high`;
    }
    return '';
  }
}
