import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-inquiry-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule
    ],
    templateUrl: './inquiry-dialog.component.html',
    styleUrls: ['./inquiry-dialog.component.css']
})
export class InquiryDialogComponent {
    inquiryForm: FormGroup;
    isSubmitting = false;

    courses = [
        'Engineering',
        'Medicine',
        'Management',
        'Arts & Science',
        'Study Abroad',
        'Law',
        'Architecture',
        'Pharmacy',
        'Nursing',
        'Paramedical'
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<InquiryDialogComponent>,
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        this.inquiryForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            course_of_interest: [''],
            message: ['']
        });
    }

    onSubmit() {
        if (this.inquiryForm.valid) {
            this.isSubmitting = true;
            const apiUrl = `${environment.apiUrl}/enquiries/`;

            this.http.post(apiUrl, this.inquiryForm.value).subscribe({
                next: (res) => {
                    this.toastr.success('Your inquiry has been submitted successfully!', 'Thank You');
                    this.isSubmitting = false;
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.error('Submission error:', err);
                    this.toastr.error('Failed to submit inquiry. Please try again later.', 'Error');
                    this.isSubmitting = false;
                }
            });
        } else {
            this.inquiryForm.markAllAsTouched();
            this.toastr.warning('Please fill in all required fields correctly.', 'Validation Error');
        }
    }

    onClose() {
        this.dialogRef.close();
    }
}
