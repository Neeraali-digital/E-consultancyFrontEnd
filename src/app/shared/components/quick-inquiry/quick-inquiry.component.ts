import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-quick-inquiry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quick-inquiry.component.html',
  styleUrl: './quick-inquiry.component.scss'
})
export class QuickInquiryComponent {
  inquiryForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      inquiry_type: ['quick']
    });
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      this.isSubmitting = true;
      const apiUrl = `${environment.apiUrl}/enquiries/`;

      this.http.post(apiUrl, this.inquiryForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Our team will contact you soon!', 'Thank You');
          this.isSubmitting = false;
          this.inquiryForm.reset({ inquiry_type: 'quick' });
        },
        error: (err) => {
          console.error('Submission error:', err);
          this.toastr.error('Failed to submit inquiry. Please try again.', 'Error');
          this.isSubmitting = false;
        }
      });
    } else {
      this.inquiryForm.markAllAsTouched();
    }
  }
}
