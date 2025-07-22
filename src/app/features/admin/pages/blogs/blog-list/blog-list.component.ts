import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Blogs</h1>
          <p class="mt-2 text-gray-600">Manage blog posts and articles</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <a routerLink="/admin/blogs/add"
             class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <span class="material-icons text-sm mr-2">add</span>
            Add New Blog
          </a>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons text-gray-400 text-sm">search</span>
            </div>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
              placeholder="Search by title, author, or content..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
          </div>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            [(ngModel)]="selectedCategory"
            (change)="onFilterChange()"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
            <option *ngFor="let category of blogCategories" [value]="category.value">{{ category.label }}</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            [(ngModel)]="selectedStatus"
            (change)="onFilterChange()"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
            <option *ngFor="let status of blogStatuses" [value]="status.value">{{ status.label }}</option>
          </select>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">{{ getTotalBlogs() }}</div>
            <div class="text-sm text-gray-600">Total Blogs</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ getPublishedBlogs() }}</div>
            <div class="text-sm text-gray-600">Published</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">{{ getDraftBlogs() }}</div>
            <div class="text-sm text-gray-600">Drafts</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ getTotalViews() }}</div>
            <div class="text-sm text-gray-600">Total Views</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="isLoading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-2">
        <svg class="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-600">Loading blogs...</span>
      </div>
    </div>

    <!-- Blogs Grid -->
    <div *ngIf="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div *ngFor="let blog of getPaginatedBlogs(); let i = index"
           class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
           [style.animation-delay]="i * 100 + 'ms'"
           style="animation: slideInUp 0.6s ease-out forwards;">

        <!-- Blog Image -->
        <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
          <img *ngIf="blog.featuredImage" [src]="blog.featuredImage" [alt]="blog.title"
               class="w-full h-full object-cover">
          <div *ngIf="!blog.featuredImage" class="w-full h-full flex items-center justify-center">
            <span class="material-icons text-white text-4xl">article</span>
          </div>

          <!-- Status Badge -->
          <div class="absolute top-4 left-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  [class.bg-green-100]="blog.status === 'published'"
                  [class.text-green-800]="blog.status === 'published'"
                  [class.bg-yellow-100]="blog.status === 'draft'"
                  [class.text-yellow-800]="blog.status === 'draft'"
                  [class.bg-gray-100]="blog.status === 'archived'"
                  [class.text-gray-800]="blog.status === 'archived'">
              {{ blog.status | titlecase }}
            </span>
          </div>
        </div>

        <!-- Blog Content -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-purple-600 font-medium">{{ getCategoryLabel(blog.category) }}</span>
            <span class="text-xs text-gray-500">{{ blog.createdAt | date:'shortDate' }}</span>
          </div>

          <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ blog.title }}</h3>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ blog.excerpt }}</p>

          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <span class="material-icons text-xs">person</span>
                <span>{{ blog.author }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="material-icons text-xs">visibility</span>
                <span>{{ blog.views }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="material-icons text-xs">favorite</span>
                <span>{{ blog.likes }}</span>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span *ngFor="let tag of blog.tags.slice(0, 3)"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
              {{ tag }}
            </span>
            <span *ngIf="blog.tags.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
              +{{ blog.tags.length - 3 }} more
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center space-x-2">
              <button
                (click)="onEdit(blog)"
                class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                title="Edit Blog">
                <span class="material-icons text-sm">edit</span>
              </button>
              <button
                (click)="onToggleStatus(blog)"
                class="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                [class.text-green-600]="blog.status !== 'published'"
                [class.text-orange-600]="blog.status === 'published'"
                [title]="blog.status === 'published' ? 'Unpublish Blog' : 'Publish Blog'">
                <span class="material-icons text-sm">
                  {{ blog.status === 'published' ? 'visibility_off' : 'publish' }}
                </span>
              </button>
              <button
                (click)="onDelete(blog)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete Blog">
                <span class="material-icons text-sm">delete</span>
              </button>
            </div>
            <span class="text-xs text-gray-500">
              Updated {{ blog.updatedAt | date:'shortDate' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div *ngIf="!isLoading && filteredBlogs.length === 0" class="text-center py-12">
      <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="material-icons text-4xl text-purple-400">article</span>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
      <p class="text-gray-600 mb-6">
        {{ searchTerm || selectedCategory !== '' || selectedStatus !== ''
           ? 'Try adjusting your search or filter criteria.'
           : 'Get started by creating your first blog post.' }}
      </p>
      <a routerLink="/admin/blogs/add"
         class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
        <span class="material-icons text-sm mr-2">add</span>
        Create First Blog
      </a>
    </div>

    <!-- Pagination -->
    <div *ngIf="!isLoading && filteredBlogs.length > 0" class="mt-8 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ getStartIndex() + 1 }} to {{ getEndIndex() }} of {{ filteredBlogs.length }} blogs
      </div>

      <div class="flex items-center space-x-2">
        <button
          (click)="previousPage()"
          [disabled]="currentPage === 1"
          class="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
          <span class="material-icons text-sm">chevron_left</span>
        </button>

        <span class="px-4 py-2 text-sm font-medium text-gray-700">
          Page {{ currentPage }} of {{ getTotalPages() }}
        </span>

        <button
          (click)="nextPage()"
          [disabled]="currentPage === getTotalPages()"
          class="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
          <span class="material-icons text-sm">chevron_right</span>
        </button>
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
  itemsPerPage = 6;

  private subscription = new Subscription();

  // Filter options
  blogCategories = [
    { value: '', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'career', label: 'Career Guidance' },
    { value: 'admission', label: 'Admission Tips' },
    { value: 'college-life', label: 'College Life' },
    { value: 'technology', label: 'Technology' },
    { value: 'news', label: 'News & Updates' }
  ];

  blogStatuses = [
    { value: '', label: 'All Statuses' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadBlogs(): void {
    this.isLoading = true;

    // Mock data - replace with actual service call
    setTimeout(() => {
      this.blogs = [
        {
          id: '1',
          title: 'Top Engineering Colleges in India 2024',
          slug: 'top-engineering-colleges-india-2024',
          excerpt: 'Discover the best engineering colleges in India for 2024, including IITs, NITs, and other premier institutions.',
          content: 'Full content here...',
          author: 'Dr. Rajesh Kumar',
          category: 'education',
          tags: ['engineering', 'colleges', 'india', 'admission'],
          featuredImage: '/assets/images/engineering-colleges.jpg',
          status: 'published',
          publishedAt: new Date('2024-01-15'),
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-15'),
          views: 1250,
          likes: 89
        },
        {
          id: '2',
          title: 'Career Opportunities in Data Science',
          slug: 'career-opportunities-data-science',
          excerpt: 'Explore the growing field of data science and the various career paths available for aspiring data scientists.',
          content: 'Full content here...',
          author: 'Priya Sharma',
          category: 'career',
          tags: ['data-science', 'career', 'technology', 'jobs'],
          featuredImage: '/assets/images/data-science-career.jpg',
          status: 'published',
          publishedAt: new Date('2024-01-12'),
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-12'),
          views: 890,
          likes: 67
        },
        {
          id: '3',
          title: 'NEET 2024: Preparation Tips and Strategies',
          slug: 'neet-2024-preparation-tips',
          excerpt: 'Essential tips and strategies to crack NEET 2024 and secure admission in top medical colleges.',
          content: 'Full content here...',
          author: 'Dr. Anita Verma',
          category: 'admission',
          tags: ['neet', 'medical', 'preparation', 'tips'],
          featuredImage: '/assets/images/neet-preparation.jpg',
          status: 'draft',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-05'),
          views: 0,
          likes: 0
        }
      ];

      this.applyFilters();
      this.isLoading = false;
    }, 1000);
  }

  applyFilters(): void {
    this.filteredBlogs = this.blogs.filter(blog => {
      const matchesSearch = !this.searchTerm ||
        blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || blog.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || blog.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    this.currentPage = 1; // Reset to first page when filters change
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  // Utility methods
  getTotalBlogs(): number {
    return this.blogs.length;
  }

  getPublishedBlogs(): number {
    return this.blogs.filter(blog => blog.status === 'published').length;
  }

  getDraftBlogs(): number {
    return this.blogs.filter(blog => blog.status === 'draft').length;
  }

  getTotalViews(): number {
    return this.blogs.reduce((total, blog) => total + blog.views, 0);
  }

  getCategoryLabel(category: string): string {
    const categoryObj = this.blogCategories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.label : category;
  }

  // Pagination methods
  getPaginatedBlogs(): Blog[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBlogs.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return Math.min(endIndex, this.filteredBlogs.length);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  // Action methods
  onEdit(blog: Blog): void {
    this.router.navigate(['/admin/blogs/edit', blog.id]);
  }

  onToggleStatus(blog: Blog): void {
    if (blog.status === 'published') {
      blog.status = 'draft';
    } else {
      blog.status = 'published';
      blog.publishedAt = new Date();
    }
    blog.updatedAt = new Date();
    // In real app, make API call to update status
    console.log('Toggle status for blog:', blog.id, 'New status:', blog.status);
  }

  onDelete(blog: Blog): void {
    if (confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      this.blogs = this.blogs.filter(b => b.id !== blog.id);
      this.applyFilters();
      console.log('Deleted blog:', blog.id);
    }
  }
}
