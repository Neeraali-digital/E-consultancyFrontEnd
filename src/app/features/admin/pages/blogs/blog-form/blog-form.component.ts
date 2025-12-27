import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from '../../../../../../environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit Blog' : 'Add Blog' }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input formControlName="title" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input formControlName="slug" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select formControlName="category" class="w-full border rounded-lg px-3 py-2">
              <option value="">Select Category</option>
              <option value="education">Education</option>
              <option value="career">Career</option>
              <option value="admission">Admission</option>
              <option value="news">News</option>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input formControlName="author" type="text" class="w-full border rounded-lg px-3 py-2">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input formControlName="tags" type="text" placeholder="Comma separated tags" class="w-full border rounded-lg px-3 py-2">
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          <input type="file" (change)="onImageSelect($event)" accept="image/*" class="w-full border rounded-lg px-3 py-2">
          <div *ngIf="imagePreview" class="mt-2">
            <img [src]="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg">
          </div>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <textarea formControlName="excerpt" rows="3" placeholder="Brief description..." class="w-full border rounded-lg px-3 py-2"></textarea>
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea formControlName="content" rows="8" placeholder="Blog content..." class="w-full border rounded-lg px-3 py-2"></textarea>
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
export class BlogFormComponent implements OnInit, OnDestroy {
  blogForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  blogId: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

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
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.blogId;

    if (this.isEditMode) {
      this.loadBlog();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      slug: [''],
      category: ['', [Validators.required]],
      status: ['draft'],
      author: ['', [Validators.required]],
      author_id: [this.getLoggedInUserId()],
      tags: [''],
      excerpt: [''],
      content: ['', [Validators.required]]
    });
  }

  private loadBlog(): void {
    const sub = this.http.get(`${API_URL}/blogs/${this.blogId}/`).subscribe({
      next: (blog: any) => {
        if (blog) {
          const formData = {
            ...blog,
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags
          };
          this.blogForm.patchValue(formData);

          if (blog.featured_image) {
            this.imagePreview = blog.featured_image;
          }
        }
      },
      error: (error: any) => {
        console.error('Failed to load blog data');
      }
    });

    this.subscription.add(sub);
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formData = new FormData();

    // Auto-generate slug from title if empty
    if (!this.blogForm.value.slug) {
      const slug = this.blogForm.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      this.blogForm.patchValue({ slug });
    }

    Object.keys(this.blogForm.value).forEach(key => {
      if (key === 'tags') {
        const tags = this.blogForm.value[key];
        if (tags) {
          const tagArray = tags.split(',').map((tag: string) => tag.trim());
          formData.append('tags', JSON.stringify(tagArray));
        }
      } else {
        formData.append(key, this.blogForm.value[key]);
      }
    });

    if (this.selectedImage) {
      formData.append('featured_image', this.selectedImage);
    }

    const apiCall = this.isEditMode
      ? this.http.put(`${API_URL}/blogs/${this.blogId}/`, formData)
      : this.http.post(`${API_URL}/blogs/`, formData);

    const sub = apiCall.subscribe({
      next: (response: any) => {
        alert(this.isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!');
        this.isSubmitting = false;
        this.router.navigate(['/admin/blogs']);
      },
      error: (error: any) => {
        alert('Error saving blog: ' + (error.error?.message || 'Unknown error'));
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

  getLoggedInUserId(): number {
    // Get from localStorage or auth service
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return parseInt(user.id) || 1;
      } catch {
        return 1;
      }
    }
    return 1; // Default fallback
  }

  onCancel(): void {
    this.router.navigate(['/admin/blogs']);
  }
}