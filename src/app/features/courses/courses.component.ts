import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CounterAnimationDirective } from '../../shared/directives/counter-animation.directive';
import { ApiService } from '../../shared/services/api.service';
import { QuickInquiryComponent } from '../../shared/components/quick-inquiry/quick-inquiry.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterAnimationDirective, QuickInquiryComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchQuery = '';
  filteredCourses: any[] = [];
  courses: any[] = [];
  loading = true;
  error: string | null = null;

  searchSuggestions = ['Engineering', 'Medical', 'Management', 'Technology', 'Arts & Science', 'Commerce'];

  staticCourses = [
    {
      id: 1,
      title: 'Engineering',
      icon: 'engineering',
      description: 'Premier engineering programs with 100% placement guarantee',
      programs: ['B.Tech', 'M.Tech', 'Diploma'],
      colleges: ['IIT', 'NIT', 'Top Private Colleges'],
      duration: '4 Years',
      eligibility: '12th with PCM',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Medical',
      icon: 'medical_services',
      description: 'MBBS, BDS, and medical courses with guaranteed admission',
      programs: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
      colleges: ['AIIMS', 'JIPMER', 'Top Medical Colleges'],
      duration: '5.5 Years',
      eligibility: '12th with PCB',
      color: 'red'
    },
    {
      id: 3,
      title: 'Management',
      icon: 'business',
      description: 'MBA and management programs from IIMs and top business schools',
      programs: ['MBA', 'PGDM', 'Executive MBA'],
      colleges: ['IIM', 'ISB', 'Top B-Schools'],
      duration: '2 Years',
      eligibility: 'Graduation',
      color: 'green'
    },
    {
      id: 4,
      title: 'Technology',
      icon: 'computer',
      description: 'Computer Science and IT programs for the digital age',
      programs: ['BCA', 'MCA', 'B.Sc IT'],
      colleges: ['Top IT Colleges', 'Universities'],
      duration: '3-4 Years',
      eligibility: '12th with Maths',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Arts & Science',
      icon: 'science',
      description: 'Diverse programs in humanities, science, and liberal arts',
      programs: ['BA', 'BSc', 'MA', 'MSc'],
      colleges: ['Top Universities', 'Liberal Arts Colleges'],
      duration: '3-4 Years',
      eligibility: '12th in relevant stream',

      color: 'indigo'
    },
    {
      id: 6,
      title: 'Commerce',
      icon: 'account_balance',
      description: 'Commerce and finance programs for business careers',
      programs: ['B.Com', 'M.Com', 'CA', 'CS'],
      colleges: ['Top Commerce Colleges', 'Universities'],
      duration: '3-4 Years',
      eligibility: '12th with Commerce',

      color: 'orange'
    }
  ];

  private router = inject(Router);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getCourses().subscribe({
      next: (response) => {
        this.courses = response.results || response;
        /*
        // If no data from API, use static data
        if (!this.courses || this.courses.length === 0) {
          this.courses = this.staticCourses;
        }
        */
        this.filteredCourses = [...this.courses];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.error = 'Failed to load courses. Using cached data.';
        this.courses = this.staticCourses;
        this.filteredCourses = [...this.courses];
        this.loading = false;
      }
    });
  }

  // Search functionality
  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = [...this.courses];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.name?.toLowerCase().includes(query) ||
      course.title?.toLowerCase().includes(query) ||
      course.description?.toLowerCase().includes(query) ||
      course.category?.toLowerCase().includes(query) ||
      course.programs?.some((program: string) => program.toLowerCase().includes(query))
    );
  }

  // Navigate to colleges with course filter
  viewColleges(course: any): void {
    this.router.navigate(['/colleges'], {
      queryParams: {
        courseFilter: course.name || course.title,
        courseId: course.id
      }
    });
  }

  // Get icon for search suggestions
  getSuggestionIcon(suggestion: string): string {
    const iconMap: { [key: string]: string } = {
      'Engineering': 'engineering',
      'Medical': 'medical_services',
      'Management': 'business',
      'Technology': 'computer',
      'Arts & Science': 'science',
      'Commerce': 'account_balance'
    };
    return iconMap[suggestion] || 'school';
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }
}
