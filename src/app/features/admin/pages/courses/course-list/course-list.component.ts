import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MinimalLoaderComponent } from '../../../../../shared/components/minimal-loader/minimal-loader.component';

export interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degreeType: string;
  description: string;
  eligibility: string;
  annualFee: number;
  totalFee: number;
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Instant loading - no delays
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCourses(): void {
    this.isLoading = true;

    // Instant mock data - no delays
    this.courses = [
        {
          id: '1',
          name: 'Bachelor of Technology in Computer Science',
          code: 'CSE101',
          category: 'engineering',
          duration: '4 Years',
          degreeType: 'undergraduate',
          description: 'A comprehensive program covering computer science fundamentals, programming, algorithms, and software development.',
          eligibility: '10+2 with Physics, Chemistry, Mathematics with minimum 60% marks',
          annualFee: 150000,
          totalFee: 600000,
          status: 'active',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: '2',
          name: 'Master of Business Administration',
          code: 'MBA101',
          category: 'management',
          duration: '2 Years',
          degreeType: 'postgraduate',
          description: 'Advanced business management program focusing on leadership, strategy, and entrepreneurship.',
          eligibility: 'Bachelor\'s degree with minimum 50% marks and valid entrance exam score',
          annualFee: 200000,
          totalFee: 400000,
          status: 'active',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10')
        },
        {
          id: '3',
          name: 'Bachelor of Medicine and Bachelor of Surgery',
          code: 'MBBS101',
          category: 'medical',
          duration: '5.5 Years',
          degreeType: 'undergraduate',
          description: 'Comprehensive medical education program preparing students for medical practice.',
          eligibility: '10+2 with Physics, Chemistry, Biology with minimum 70% marks and NEET qualification',
          annualFee: 500000,
          totalFee: 2750000,
          status: 'active',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-05')
        },
        {
          id: '4',
          name: 'Diploma in Computer Applications',
          code: 'DCA101',
          category: 'engineering',
          duration: '1 Year',
          degreeType: 'diploma',
          description: 'Short-term program covering basic computer applications and software skills.',
          eligibility: '10+2 from any stream',
          annualFee: 25000,
          totalFee: 25000,
          status: 'inactive',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ];

    this.applyFilters();
    this.isLoading = false;
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchTerm ||
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesDegreeType = !this.selectedDegreeType || course.degreeType === this.selectedDegreeType;

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
    course.status = course.status === 'active' ? 'inactive' : 'active';
    course.updatedAt = new Date();
    // In real app, make API call to update status
    console.log('Toggle status for course:', course.id, 'New status:', course.status);
  }

  onDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete the course "${course.name}"?`)) {
      this.courses = this.courses.filter(c => c.id !== course.id);
      this.applyFilters();
      console.log('Deleted course:', course.id);
    }
  }
}
