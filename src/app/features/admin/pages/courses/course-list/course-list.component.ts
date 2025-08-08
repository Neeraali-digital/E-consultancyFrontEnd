import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MinimalLoaderComponent } from '../../../../../shared/components/minimal-loader/minimal-loader.component';
import { HttpClient } from '@angular/common/http';
// import { AlertService } from '../../../../shared/services/alert.service';
// import { AuthService } from '../../../../shared/services/auth.service';
// import { LoginModalComponent } from '../../../../shared/components/login-modal/login-modal.component';

const API_URL = 'http://127.0.0.1:8000/api';


export interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degree_type: string;
  description: string;
  eligibility: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MinimalLoaderComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  isLoading = true;
  searchTerm = '';
  selectedCategory = '';
  selectedDegreeType = '';
  currentPage = 1;
  itemsPerPage = 9;

  private subscription = new Subscription();

  // Filter options
  courseCategories = [
    { value: '', label: 'All Categories' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'management', label: 'Management' },
    { value: 'arts', label: 'Arts & Science' },
    { value: 'law', label: 'Law' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'architecture', label: 'Architecture' }
  ];

  degreeTypes = [
    { value: '', label: 'All Degree Types' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'doctorate', label: 'Doctorate' }
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    // private alertService: AlertService
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Instant loading - no delays
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCourses(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/courses/`).subscribe({
      next: (response: any) => {
        this.courses = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading courses:', error);
        this.courses = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchTerm ||
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesDegreeType = !this.selectedDegreeType || course.degree_type === this.selectedDegreeType;

      return matchesSearch && matchesCategory && matchesDegreeType;
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
  getTotalCourses(): number {
    return this.courses.length;
  }

  getActiveCourses(): number {
    return this.courses.filter(course => course.status === 'active').length;
  }

  getInactiveCourses(): number {
    return this.courses.filter(course => course.status === 'inactive').length;
  }

  getFilteredCount(): number {
    return this.filteredCourses.length;
  }

  getCategoryLabel(category: string): string {
    const categoryObj = this.courseCategories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.label : category;
  }

  getDegreeTypeLabel(degreeType: string): string {
    const typeObj = this.degreeTypes.find(type => type.value === degreeType);
    return typeObj ? typeObj.label : degreeType;
  }

  // Pagination methods
  getPaginatedCourses(): Course[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return Math.min(endIndex, this.filteredCourses.length);
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
  onEdit(course: Course): void {
    this.router.navigate(['/admin/courses/edit', course.id]);
  }

  onToggleStatus(course: Course): void {
    const sub = this.http.post(`${API_URL}/courses/${course.id}/toggle-status/`, {}).subscribe({
      next: (updatedCourse: any) => {
        const index = this.courses.findIndex(c => c.id === course.id);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
          this.applyFilters();
        }
        console.log('Course status updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating course status');
      }
    });
    
    this.subscription.add(sub);
  }

  onDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete the course "${course.name}"?`)) {
      const sub = this.http.delete(`${API_URL}/courses/${course.id}/`).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== course.id);
          this.applyFilters();
          console.log('Course deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting course');
        }
      });
      
      this.subscription.add(sub);
    }
  }
}
