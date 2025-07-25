import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CollegeService } from '../../../services/college.service';
import { Subscription } from 'rxjs';
import { MinimalLoaderComponent } from '../../../../../shared/components/minimal-loader/minimal-loader.component';

export interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  established: number;
  courses: string[];
  rating: number;

  status: 'active' | 'inactive';
  image?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
}

@Component({
  selector: 'app-college-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MinimalLoaderComponent],
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.scss']
})
export class CollegeListComponent implements OnInit, OnDestroy {
  colleges: College[] = [];
  filteredColleges: College[] = [];
  isLoading = true;
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';
  sortBy = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  private subscription = new Subscription();

  // Filter options
  collegeTypes = [
    { value: '', label: 'All Types' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'management', label: 'Management' },
    { value: 'arts', label: 'Arts & Science' },
    { value: 'law', label: 'Law' },
    { value: 'pharmacy', label: 'Pharmacy' }
  ];

  statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'established', label: 'Established Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'location', label: 'Location' }
  ];

  constructor(private collegeService: CollegeService) {}

  ngOnInit(): void {
    // Instant loading - no delays
    this.loadColleges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadColleges(): void {
    this.isLoading = true;
    this.subscription.add(
      this.collegeService.getColleges().subscribe({
        next: (colleges) => {
          this.colleges = colleges;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading colleges:', error);
          this.isLoading = false;
        }
      })
    );
  }

  applyFilters(): void {
    let filtered = [...this.colleges];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(term) ||
        college.location.toLowerCase().includes(term) ||
        college.type.toLowerCase().includes(term)
      );
    }

    // Type filter
    if (this.selectedType) {
      filtered = filtered.filter(college => college.type === this.selectedType);
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(college => college.status === this.selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof College];
      let bValue: any = b[this.sortBy as keyof College];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredColleges = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  getPaginatedColleges(): College[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredColleges.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  deleteCollege(college: College): void {
    if (confirm(`Are you sure you want to delete ${college.name}?`)) {
      this.subscription.add(
        this.collegeService.deleteCollege(college.id).subscribe({
          next: () => {
            this.loadColleges();
          },
          error: (error) => {
            console.error('Error deleting college:', error);
            alert('Error deleting college. Please try again.');
          }
        })
      );
    }
  }

  toggleStatus(college: College): void {
    const newStatus: 'active' | 'inactive' = college.status === 'active' ? 'inactive' : 'active';
    const updatedCollege: Partial<College> = { ...college, status: newStatus };

    this.subscription.add(
      this.collegeService.updateCollege(college.id, updatedCollege).subscribe({
        next: () => {
          this.loadColleges();
        },
        error: (error) => {
          console.error('Error updating college status:', error);
          alert('Error updating college status. Please try again.');
        }
      })
    );
  }

  getStatusColor(status: string): string {
    return status === 'active' ? 'text-green-600' : 'text-red-600';
  }

  getStatusBgColor(status: string): string {
    return status === 'active' ? 'bg-green-100' : 'bg-red-100';
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (hasHalfStar) {
      stars.push('star_half');
    }

    while (stars.length < 5) {
      stars.push('star_border');
    }

    return stars;
  }
}
