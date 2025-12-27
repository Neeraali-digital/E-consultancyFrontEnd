import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  colleges: any[] = [];
  loading = true;
  error: string | null = null;
  filters = {
    type: 'All',
    location: 'All',
    ranking: 'All',
    course: 'All'
  };

  filteredColleges: any[] = [];
  selectedCourseFilter = '';
  showMobileFilters = false;
  searchQuery = '';

  // Filter options - initialized with 'All'
  collegeTypes: string[] = ['All'];
  locations: string[] = ['All'];
  courseTypes: string[] = ['All'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadColleges();

    // Check for course filter from query params
    this.route.queryParams.subscribe(params => {
      if (params['courseFilter']) {
        this.selectedCourseFilter = params['courseFilter'];
        this.filters.course = params['courseFilter'];
      }
      this.applyFilters();
    });
  }

  loadColleges(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getColleges().subscribe({
      next: (response) => {
        let apiColleges = response.results || response;

        if (apiColleges && apiColleges.length > 0) {
          this.colleges = apiColleges.map((college: any) => ({
            id: college.id,
            name: college.name,
            shortName: college.short_name || college.name,
            type: college.type,
            location: college.location,
            established: college.established,
            ranking: college.ranking || 999,
            courses: Array.isArray(college.courses) ? college.courses : [],
            institutionType: college.institution_type,
            affiliated: college.affiliated,
            rating: college.rating || 4.0,
            image: college.image,
            featured: college.ranking <= 10,
            color: this.getCollegeColor(college.type),
            courseTypes: [college.type] // Simplify for now as type is main category
          }));

          // Extract dynamic filter options from data
          this.extractFilterOptions();

        } else {
          this.colleges = [];
        }

        this.filteredColleges = [...this.colleges];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading colleges:', error);
        this.error = 'Failed to load colleges from API.';
        this.colleges = [];
        this.filteredColleges = [];
        this.loading = false;
      }
    });
  }

  extractFilterOptions(): void {
    // Extract unique types
    const types = new Set<string>(this.colleges.map(c => c.type).filter(t => t));
    this.collegeTypes = ['All', ...Array.from(types).sort()];

    // Extract unique locations
    const locs = new Set<string>(this.colleges.map(c => c.location).filter(l => l));
    this.locations = ['All', ...Array.from(locs).sort()];
    
    // Extract unique specific courses (e.g. B.Tech, MBBS)
    const allCourses = this.colleges.reduce((acc, college) => {
      if (Array.isArray(college.courses)) {
        return [...acc, ...college.courses];
      }
      return acc;
    }, []);
    const uniqueCourses = new Set<string>(allCourses.filter((c: string) => c));
    this.courseTypes = ['All', ...Array.from(uniqueCourses).sort()];
  }

  applyFilters(): void {
    this.filteredColleges = this.colleges.filter(college => {
      // Search filter
      const searchMatch = !this.searchQuery ||
        college.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        college.shortName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        college.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        college.courses?.some((course: string) => course.toLowerCase().includes(this.searchQuery.toLowerCase()));

      // Type filter
      const typeMatch = this.filters.type === 'All' || college.type === this.filters.type;

      // Location filter (Exact match since options come from data)
      const locationMatch = this.filters.location === 'All' || college.location === this.filters.location;

      // Course filter (Check if the selected course is in the college's course list)
      const courseMatch = this.filters.course === 'All' ||
        (Array.isArray(college.courses) && college.courses.includes(this.filters.course));

      // Ranking filter
      const rankingMatch = this.filters.ranking === 'All' ||
        (this.filters.ranking === 'Top 10' && college.ranking <= 10) ||
        (this.filters.ranking === 'Top 20' && college.ranking <= 20);

      return searchMatch && typeMatch && locationMatch && courseMatch && rankingMatch;
    });
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filters.type !== 'All') count++;
    if (this.filters.location !== 'All') count++;
    if (this.filters.ranking !== 'All') count++;
    if (this.filters.course !== 'All') count++;
    if (this.searchQuery.trim()) count++;
    return count;
  }



  clearFilters(): void {
    this.filters = {
      type: 'All',
      location: 'All',
      ranking: 'All',
      course: 'All'
    };
    this.selectedCourseFilter = '';
    this.searchQuery = '';
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(rating));
  }

  viewCollegeDetails(collegeId: number): void {
    console.log('Navigating to college detail with ID:', collegeId);
    this.router.navigate(['/college', collegeId]);
  }

  private getCollegeColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      'engineering': 'blue',
      'medical': 'red',
      'management': 'green',
      'arts': 'purple',
      'law': 'orange',
      'pharmacy': 'indigo'
    };
    return colorMap[type?.toLowerCase()] || 'blue';
  }

  getCoursesToDisplay(college: any): string[] {
    if (college.courses && Array.isArray(college.courses) && college.courses.length > 0) {
      return college.courses.slice(0, 5);
    }
    return [];
  }

  // Add debugging method to log college data
  logCollegeData(): void {
    console.log('Current colleges data:', this.colleges.map(c => ({ id: c.id, name: c.name })));
    console.log('Filtered colleges data:', this.filteredColleges.map(c => ({ id: c.id, name: c.name })));
  }

  // Helper method to get type of value for debugging
  typeof(value: any): string {
    return typeof value;
  }
}
