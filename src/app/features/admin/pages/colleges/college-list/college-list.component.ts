import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
// Temporarily disabled services

const API_URL = 'http://127.0.0.1:8000/api';

export interface College {
  id: string;
  name: string;
  short_name: string;
  type: string;
  location: string;
  established: number;
  ranking: number;
  courses: string[];
  institution_type: string;
  affiliated: string;
  rating?: number;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-college-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Colleges</h1>
        <button (click)="addCollege()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add College
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search colleges..." 
               class="border rounded-lg px-3 py-2">
        <select [(ngModel)]="selectedType" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Types</option>
          <option value="engineering">Engineering</option>
          <option value="medical">Medical</option>
          <option value="management">Management</option>
        </select>
        <select [(ngModel)]="selectedLocation" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>
    </div>

    <div *ngIf="isLoading" class="text-center py-8">Loading...</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let college of getPaginatedColleges()" 
           class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
        
        <!-- College Image -->
        <div class="relative h-36 overflow-hidden bg-gray-100">
          <img *ngIf="college.image" [src]="college.image" [alt]="college.name" 
               class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          <div *ngIf="!college.image" class="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-indigo-600">
            <span class="text-white text-3xl font-bold">{{ college.short_name.charAt(0) || college.name.charAt(0) }}</span>
          </div>
          
          <!-- Status Badge -->
          <div class="absolute top-3 right-3">
            <span class="px-2 py-1 rounded-full text-xs font-semibold shadow-lg" 
                  [class.bg-green-500]="college.status === 'active'"
                  [class.text-white]="college.status === 'active'"
                  [class.bg-red-500]="college.status === 'inactive'"
                  [class.text-white]="college.status === 'inactive'">
              {{ college.status | titlecase }}
            </span>
          </div>
        </div>
        
        <!-- College Info -->
        <div class="p-4">
          <div class="mb-3">
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ college.short_name }}</h3>
            <p class="text-gray-600 text-sm line-clamp-2">{{ college.name }}</p>
          </div>
          
          <!-- Info Grid -->
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div class="bg-blue-50 rounded-lg p-2">
              <div class="flex items-center gap-1 mb-1">
                <span class="material-icons text-blue-600 text-base">location_on</span>
                <span class="text-blue-700 text-xs font-medium">Location</span>
              </div>
              <p class="text-blue-900 text-xs font-bold truncate">{{ college.location }}</p>
            </div>
            
            <div class="bg-purple-50 rounded-lg p-2">
              <div class="flex items-center gap-1 mb-1">
                <span class="material-icons text-purple-600 text-base">calendar_today</span>
                <span class="text-purple-700 text-xs font-medium">Est.</span>
              </div>
              <p class="text-purple-900 text-xs font-bold">{{ college.established }}</p>
            </div>
            
            <div class="bg-indigo-50 rounded-lg p-2">
              <div class="flex items-center gap-1 mb-1">
                <span class="material-icons text-indigo-600 text-base">school</span>
                <span class="text-indigo-700 text-xs font-medium">Type</span>
              </div>
              <p class="text-indigo-900 text-xs font-bold truncate">{{ college.type | titlecase }}</p>
            </div>
            
            <div class="bg-emerald-50 rounded-lg p-2">
              <div class="flex items-center gap-1 mb-1">
                <span class="material-icons text-emerald-600 text-base">star</span>
                <span class="text-emerald-700 text-xs font-medium">Rating</span>
              </div>
              <p class="text-emerald-900 text-xs font-bold">{{ college.rating || 4.0 }}/5</p>
            </div>
          </div>
          
          <!-- Courses -->
          <div *ngIf="college.courses && college.courses.length > 0" class="mb-3">
            <div class="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div class="flex items-center gap-1 mb-2">
                <span class="material-icons text-orange-600 text-base">menu_book</span>
                <span class="text-gray-700 text-xs font-semibold">Courses</span>
              </div>
              <div class="flex flex-wrap gap-1">
                <span *ngFor="let course of college.courses.slice(0, 3)" 
                      class="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                  {{ course }}
                </span>
                <span *ngIf="college.courses.length > 3" 
                      class="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-medium rounded-full">
                  +{{ college.courses.length - 3 }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <div class="flex gap-2">
              <button (click)="editCollege(college)" 
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <span class="material-icons text-sm">edit</span>
              </button>
              <button (click)="toggleStatus(college)" 
                      class="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
                <span class="material-icons text-sm">{{ college.status === 'active' ? 'visibility_off' : 'visibility' }}</span>
              </button>
              <button (click)="deleteCollege(college)" 
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                <span class="material-icons text-sm">delete</span>
              </button>
            </div>
            
            <div class="text-xs text-gray-500">
              ID: {{ college.id }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login modal temporarily disabled -->
  `
})
export class CollegeListComponent implements OnInit, OnDestroy {
  colleges: College[] = [];
  filteredColleges: College[] = [];
  isLoading = true;
  searchTerm = '';
  selectedType = '';
  selectedLocation = '';
  currentPage = 1;
  itemsPerPage = 9;
  // showLoginModal = false;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient,
    // private alertService: AlertService,
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadColleges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadColleges(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/colleges/`).subscribe({
      next: (response: any) => {
        this.colleges = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading colleges:', error);
        this.colleges = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredColleges = this.colleges.filter(college => {
      const matchesSearch = !this.searchTerm ||
        college.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        college.short_name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = !this.selectedType || college.type === this.selectedType;
      const matchesLocation = !this.selectedLocation || college.location.includes(this.selectedLocation);

      return matchesSearch && matchesType && matchesLocation;
    });

    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getPaginatedColleges(): College[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredColleges.slice(startIndex, endIndex);
  }

  addCollege(): void {
    this.router.navigate(['/admin/colleges/add']);
  }

  editCollege(college: College): void {
    this.router.navigate(['/admin/colleges/edit', college.id]);
  }

  toggleStatus(college: College): void {
    const newStatus = college.status === 'active' ? 'inactive' : 'active';
    
    const sub = this.http.patch(`${API_URL}/colleges/${college.id}/`, { status: newStatus }).subscribe({
      next: (updatedCollege: any) => {
        const index = this.colleges.findIndex(c => c.id === college.id);
        if (index !== -1) {
          this.colleges[index] = updatedCollege;
          this.applyFilters();
        }
        console.log('College status updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating college status:', error);
      }
    });
    
    this.subscription.add(sub);
  }

  deleteCollege(college: College): void {
    if (confirm(`Are you sure you want to delete "${college.name}"?`)) {
      const sub = this.http.delete(`${API_URL}/colleges/${college.id}/`).subscribe({
        next: () => {
          this.colleges = this.colleges.filter(c => c.id !== college.id);
          this.applyFilters();
          console.log('College deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting college');
        }
      });
      
      this.subscription.add(sub);
    }
  }

  // onLoginSuccess(): void {
  //   this.showLoginModal = false;
  //   this.loadColleges();
  // }
}