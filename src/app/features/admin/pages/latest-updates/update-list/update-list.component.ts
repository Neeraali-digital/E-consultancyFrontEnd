import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api';

export interface LatestUpdate {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  status: 'published' | 'draft';
  published_at?: Date;
  created_at: Date;
}

@Component({
  selector: 'app-update-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Latest Updates</h1>
        <button (click)="addUpdate()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Update
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search updates..." 
               class="border rounded-lg px-3 py-2">
        <select [(ngModel)]="selectedCategory" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          <option value="admission">Admission</option>
          <option value="exam">Exam</option>
          <option value="announcement">Announcement</option>
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
      <div *ngFor="let update of getPaginatedUpdates()" class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-start mb-3">
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                [class.bg-red-100]="update.priority === 'high'"
                [class.text-red-800]="update.priority === 'high'"
                [class.bg-yellow-100]="update.priority === 'medium'"
                [class.text-yellow-800]="update.priority === 'medium'"
                [class.bg-green-100]="update.priority === 'low'"
                [class.text-green-800]="update.priority === 'low'">
            {{ update.priority | titlecase }}
          </span>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                [class.bg-green-100]="update.status === 'published'"
                [class.text-green-800]="update.status === 'published'"
                [class.bg-yellow-100]="update.status === 'draft'"
                [class.text-yellow-800]="update.status === 'draft'">
            {{ update.status }}
          </span>
        </div>
        
        <h3 class="text-xl font-bold mb-2">{{ update.title }}</h3>
        <p class="text-gray-600 mb-2">{{ update.content | slice:0:100 }}...</p>
        <p class="text-sm text-gray-500 mb-4">{{ update.category | titlecase }} • {{ update.created_at | date:'short' }}</p>
        
        <div class="flex justify-end gap-2">
          <button (click)="editUpdate(update)" class="text-blue-600 hover:text-blue-800">
            <span class="material-icons text-sm">edit</span>
          </button>
          <button (click)="toggleStatus(update)" class="text-orange-600 hover:text-orange-800">
            <span class="material-icons text-sm">{{ update.status === 'published' ? 'visibility_off' : 'visibility' }}</span>
          </button>
          <button (click)="deleteUpdate(update)" class="text-red-600 hover:text-red-800">
            <span class="material-icons text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class UpdateListComponent implements OnInit, OnDestroy {
  updates: LatestUpdate[] = [];
  filteredUpdates: LatestUpdate[] = [];
  isLoading = true;
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 9;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUpdates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUpdates(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/latest-updates/`).subscribe({
      next: (response: any) => {
        this.updates = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading updates:', error);
        this.updates = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredUpdates = this.updates.filter(update => {
      const matchesSearch = !this.searchTerm ||
        update.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        update.content.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || update.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || update.status === this.selectedStatus;

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

  getPaginatedUpdates(): LatestUpdate[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUpdates.slice(startIndex, endIndex);
  }

  addUpdate(): void {
    this.router.navigate(['/admin/latest-updates/add']);
  }

  editUpdate(update: LatestUpdate): void {
    this.router.navigate(['/admin/latest-updates/edit', update.id]);
  }

  toggleStatus(update: LatestUpdate): void {
    const newStatus = update.status === 'published' ? 'draft' : 'published';
    
    const sub = this.http.patch(`${API_URL}/latest-updates/${update.id}/`, { status: newStatus }).subscribe({
      next: (updatedUpdate: any) => {
        const index = this.updates.findIndex(u => u.id === update.id);
        if (index !== -1) {
          this.updates[index] = updatedUpdate;
          this.applyFilters();
        }
        console.log('Update status changed successfully');
      },
      error: (error: any) => {
        console.error('Error updating status');
      }
    });
    
    this.subscription.add(sub);
  }

  deleteUpdate(update: LatestUpdate): void {
    if (confirm(`Are you sure you want to delete "${update.title}"?`)) {
      const sub = this.http.delete(`${API_URL}/latest-updates/${update.id}/`).subscribe({
        next: () => {
          this.updates = this.updates.filter(u => u.id !== update.id);
          this.applyFilters();
          console.log('Update deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting update');
        }
      });
      
      this.subscription.add(sub);
    }
  }
}