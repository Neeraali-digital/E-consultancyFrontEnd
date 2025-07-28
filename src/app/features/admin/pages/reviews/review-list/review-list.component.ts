import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api';

export interface Review {
  id: string;
  student_name: string;
  college_name?: string;
  course_name?: string;
  rating: number;
  title: string;
  content: string;
  is_approved: boolean;
  created_at: Date;
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Reviews</h1>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search reviews..." 
               class="border rounded-lg px-3 py-2">
        <select [(ngModel)]="selectedRating" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select [(ngModel)]="selectedStatus" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Status</option>
          <option value="true">Approved</option>
          <option value="false">Pending</option>
        </select>
      </div>
    </div>

    <div *ngIf="isLoading" class="text-center py-8">Loading...</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let review of getPaginatedReviews()" class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center">
            <div class="flex text-yellow-400 mr-2">
              <span *ngFor="let star of getStars(review.rating)" class="material-icons text-sm">star</span>
              <span *ngFor="let star of getEmptyStars(review.rating)" class="material-icons text-sm text-gray-300">star</span>
            </div>
            <span class="text-sm text-gray-600">{{ review.rating }}/5</span>
          </div>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                [class.bg-green-100]="review.is_approved"
                [class.text-green-800]="review.is_approved"
                [class.bg-yellow-100]="!review.is_approved"
                [class.text-yellow-800]="!review.is_approved">
            {{ review.is_approved ? 'Approved' : 'Pending' }}
          </span>
        </div>
        
        <h3 class="text-lg font-bold mb-2">{{ review.title }}</h3>
        <p class="text-gray-600 mb-2">{{ review.content | slice:0:100 }}...</p>
        <p class="text-sm text-gray-500 mb-2">By {{ review.student_name }}</p>
        <p class="text-sm text-gray-500 mb-4">
          {{ review.college_name || review.course_name }} • {{ review.created_at | date:'short' }}
        </p>
        
        <div class="flex justify-end gap-2">
          <button (click)="toggleApproval(review)" class="text-green-600 hover:text-green-800">
            <span class="material-icons text-sm">{{ review.is_approved ? 'visibility_off' : 'check_circle' }}</span>
          </button>
          <button (click)="deleteReview(review)" class="text-red-600 hover:text-red-800">
            <span class="material-icons text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ReviewListComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  isLoading = true;
  searchTerm = '';
  selectedRating = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 9;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadReviews(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/reviews/`).subscribe({
      next: (response: any) => {
        this.reviews = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading reviews:', error);
        this.reviews = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredReviews = this.reviews.filter(review => {
      const matchesSearch = !this.searchTerm ||
        review.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.student_name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;
      const matchesStatus = !this.selectedStatus || review.is_approved.toString() === this.selectedStatus;

      return matchesSearch && matchesRating && matchesStatus;
    });

    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getPaginatedReviews(): Review[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReviews.slice(startIndex, endIndex);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  toggleApproval(review: Review): void {
    const newStatus = !review.is_approved;
    
    const sub = this.http.patch(`${API_URL}/reviews/${review.id}/`, { is_approved: newStatus }).subscribe({
      next: (updatedReview: any) => {
        const index = this.reviews.findIndex(r => r.id === review.id);
        if (index !== -1) {
          this.reviews[index] = updatedReview;
          this.applyFilters();
        }
        console.log('Review approval status updated');
      },
      error: (error: any) => {
        console.error('Error updating review approval');
      }
    });
    
    this.subscription.add(sub);
  }

  deleteReview(review: Review): void {
    if (confirm(`Are you sure you want to delete the review "${review.title}"?`)) {
      const sub = this.http.delete(`${API_URL}/reviews/${review.id}/`).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.id !== review.id);
          this.applyFilters();
          console.log('Review deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting review');
        }
      });
      
      this.subscription.add(sub);
    }
  }
}