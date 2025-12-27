import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from '../../../../../../environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit Update' : 'Add Update' }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <form [formGroup]="updateForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input formControlName="title" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select formControlName="category" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Category</option>
              <option value="admission">Admission</option>
              <option value="exam">Exam</option>
              <option value="announcement">Announcement</option>
              <option value="news">News</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
            <select formControlName="priority" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select formControlName="status" class="w-full border rounded-lg px-3 py-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Published Date</label>
            <input formControlName="published_at" type="datetime-local" class="w-full border rounded-lg px-3 py-2">
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea formControlName="content" rows="6" placeholder="Update content..." class="w-full border rounded-lg px-3 py-2"></textarea>
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
export class UpdateFormComponent implements OnInit, OnDestroy {
  updateForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  updateId: string | null = null;

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.updateId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.updateId;

    if (this.isEditMode) {
      this.loadUpdate();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['draft'],
      published_at: ['']
    });
  }

  private loadUpdate(): void {
    const sub = this.http.get(`${API_URL}/latest-updates/${this.updateId}/`).subscribe({
      next: (update: any) => {
        if (update) {
          this.updateForm.patchValue(update);
        }
      },
      error: (error: any) => {
        console.error('Failed to load update data');
      }
    });

    this.subscription.add(sub);
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formData = this.updateForm.value;

    const apiCall = this.isEditMode
      ? this.http.put(`${API_URL}/latest-updates/${this.updateId}/`, formData)
      : this.http.post(`${API_URL}/latest-updates/`, formData);

    const sub = apiCall.subscribe({
      next: (response: any) => {
        alert(this.isEditMode ? 'Update updated successfully!' : 'Update created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/latest-updates']);
      },
      error: (error: any) => {
        alert('Error saving update: ' + (error.error?.message || 'Unknown error'));
        this.isSubmitting = false;
      }
    });

    this.subscription.add(sub);
  }

  onCancel(): void {
    this.router.navigate(['/admin/latest-updates']);
  }
}