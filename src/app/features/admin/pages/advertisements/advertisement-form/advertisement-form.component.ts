import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../shared/services/api.service';

@Component({
  selector: 'app-advertisement-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit Advertisement' : 'Add Advertisement' }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <form [formGroup]="adForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input formControlName="title" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle *</label>
            <input formControlName="subtitle" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea formControlName="description" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Button Text *</label>
            <input formControlName="button_text" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <input formControlName="order" type="number" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select formControlName="is_active" class="w-full border rounded-lg px-3 py-2">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Advertisement Image {{ !isEditMode ? '*' : '(Optional - leave empty to keep current image)' }}
          </label>
          <input type="file" (change)="onImageSelect($event)" accept="image/*" class="w-full border rounded-lg px-3 py-2">
          <div *ngIf="imagePreview" class="mt-4">
            <img [src]="imagePreview" alt="Preview" class="w-full max-w-md h-48 object-cover rounded-lg">
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
export class AdvertisementFormComponent implements OnInit, OnDestroy {
  adForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  adId: string | null = null;
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
    this.adId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.adId;

    if (this.isEditMode) {
      this.loadAdvertisement();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.adForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      button_text: ['', [Validators.required]],
      order: [1, [Validators.required, Validators.min(1)]],
      is_active: ['true']
    });
  }

  private loadAdvertisement(): void {
    const sub = this.apiService.get(`/advertisements/${this.adId}/`).subscribe({
      next: (ad: any) => {
        if (ad) {
          this.adForm.patchValue({
            title: ad.title,
            subtitle: ad.subtitle,
            description: ad.description,
            button_text: ad.button_text,
            order: ad.order,
            is_active: ad.is_active.toString()
          });
          
          if (ad.image) {
            this.imagePreview = ad.image;
          }
        }
      },
      error: (error: any) => {
        console.error('Failed to load advertisement data:', error);
      }
    });
    this.subscription.add(sub);
  }

  onSubmit(): void {
    if (this.adForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    
    Object.keys(this.adForm.value).forEach(key => {
      if (this.adForm.value[key] !== null && this.adForm.value[key] !== '') {
        if (key === 'is_active') {
          formData.append(key, this.adForm.value[key] === 'true' ? 'true' : 'false');
        } else {
          formData.append(key, this.adForm.value[key]);
        }
      }
    });
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    const apiCall = this.isEditMode 
      ? this.apiService.put(`/advertisements/${this.adId}/`, formData)
      : this.apiService.post('/advertisements/', formData);

    const sub = apiCall.subscribe({
      next: (response: any) => {
        console.log('Advertisement saved successfully:', response);
        alert(this.isEditMode ? 'Advertisement updated successfully!' : 'Advertisement created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/advertisements']);
      },
      error: (error: any) => {
        console.error('Error saving advertisement:', error);
        let errorMessage = 'Unknown error';
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.detail) {
            errorMessage = error.error.detail;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else {
            errorMessage = JSON.stringify(error.error);
          }
        }
        alert('Error saving advertisement: ' + errorMessage);
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
    this.router.navigate(['/admin/advertisements']);
  }
}