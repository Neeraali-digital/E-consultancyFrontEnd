import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import { AlertService } from '../../../../shared/services/alert.service';

const API_URL = 'http://127.0.0.1:8000/api';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featured_image?: string;
  status: 'published' | 'draft';
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Blogs</h1>
        <button (click)="addBlog()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Blog
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search blogs..." 
               class="border rounded-lg px-3 py-2">
        <select [(ngModel)]="selectedCategory" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          <option value="education">Education</option>
          <option value="career">Career</option>
          <option value="admission">Admission</option>
        </select>
        <select [(ngModel)]="selectedStatus" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>

    <div *ngIf="isLoading" class="text-center py-8">Loading...</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let blog of getPaginatedBlogs()" class="bg-white rounded-xl shadow-sm p-6">
        <div *ngIf="blog.featured_image" class="mb-3">
          <img [src]="blog.featured_image" alt="{{ blog.title }}" class="w-full h-32 object-cover rounded-lg">
        </div>
        <h3 class="text-xl font-bold mb-2">{{ blog.title }}</h3>
        <p class="text-gray-600 mb-2">{{ blog.excerpt }}</p>
        <p class="text-sm text-gray-500 mb-4">By {{ blog.author }} • {{ blog.category }}</p>
        
        <div class="flex justify-between items-center">
          <span class="px-2 py-1 rounded-full text-xs" 
                [class.bg-green-100]="blog.status === 'published'"
                [class.text-green-800]="blog.status === 'published'"
                [class.bg-yellow-100]="blog.status === 'draft'"
                [class.text-yellow-800]="blog.status === 'draft'">
            {{ blog.status }}
          </span>
          
          <div class="flex gap-2">
            <button (click)="editBlog(blog)" class="text-blue-600 hover:text-blue-800">
              <span class="material-icons text-sm">edit</span>
            </button>
            <button (click)="toggleStatus(blog)" class="text-orange-600 hover:text-orange-800">
              <span class="material-icons text-sm">{{ blog.status === 'published' ? 'visibility_off' : 'visibility' }}</span>
            </button>
            <button (click)="deleteBlog(blog)" class="text-red-600 hover:text-red-800">
              <span class="material-icons text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  isLoading = true;
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 9;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient,
    // private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadBlogs(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/blogs/`).subscribe({
      next: (response: any) => {
        this.blogs = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading blogs:', error);
        this.blogs = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredBlogs = this.blogs.filter(blog => {
      const matchesSearch = !this.searchTerm ||
        blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || blog.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || blog.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getPaginatedBlogs(): Blog[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBlogs.slice(startIndex, endIndex);
  }

  addBlog(): void {
    this.router.navigate(['/admin/blogs/add']);
  }

  editBlog(blog: Blog): void {
    this.router.navigate(['/admin/blogs/edit', blog.id]);
  }

  toggleStatus(blog: Blog): void {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    const sub = this.http.patch(`${API_URL}/blogs/${blog.id}/`, { status: newStatus }).subscribe({
      next: (updatedBlog: any) => {
        const index = this.blogs.findIndex(b => b.id === blog.id);
        if (index !== -1) {
          this.blogs[index] = updatedBlog;
          this.applyFilters();
        }
        console.log('Blog status updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating blog status');
      }
    });
    
    this.subscription.add(sub);
  }

  deleteBlog(blog: Blog): void {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      const sub = this.http.delete(`${API_URL}/blogs/${blog.id}/`).subscribe({
        next: () => {
          this.blogs = this.blogs.filter(b => b.id !== blog.id);
          this.applyFilters();
          console.log('Blog deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting blog');
        }
      });
      
      this.subscription.add(sub);
    }
  }
}