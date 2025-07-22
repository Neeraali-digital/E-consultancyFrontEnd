import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      type: 'Engineering',
      location: 'New Delhi',
      established: 1961,
      ranking: 1,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      placement: '95%',
      avgPackage: '₹18 LPA',
      rating: 4.8,
      image: 'iit-delhi.jpg',
      featured: true,
      color: 'blue',
      courseTypes: ['Engineering', 'Technology']
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      shortName: 'AIIMS Delhi',
      type: 'Medical',
      location: 'New Delhi',
      established: 1956,
      ranking: 1,
      courses: ['MBBS', 'MD', 'MS'],
      placement: '100%',
      avgPackage: '₹25 LPA',
      rating: 4.9,
      image: 'aiims-delhi.jpg',
      featured: true,
      color: 'red',
      courseTypes: ['Medical']
    },
    {
      id: 3,
      name: 'Indian Institute of Management Bangalore',
      shortName: 'IIM Bangalore',
      type: 'Management',
      location: 'Bangalore',
      established: 1973,
      ranking: 1,
      courses: ['MBA', 'PGDM', 'Executive MBA'],
      placement: '100%',
      avgPackage: '₹35 LPA',
      rating: 4.7,
      image: 'iim-bangalore.jpg',
      featured: true,
      color: 'green',
      courseTypes: ['Management']
    },
    {
      id: 4,
      name: 'National Institute of Technology Trichy',
      shortName: 'NIT Trichy',
      type: 'Engineering',
      location: 'Tiruchirappalli',
      established: 1964,
      ranking: 8,
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      placement: '92%',
      avgPackage: '₹12 LPA',
      rating: 4.5,
      image: 'nit-trichy.jpg',
      featured: false,
      color: 'blue',
      courseTypes: ['Engineering', 'Technology', 'Management']
    },
    {
      id: 5,
      name: 'Manipal Academy of Higher Education',
      shortName: 'Manipal University',
      type: 'Multi-Disciplinary',
      location: 'Manipal',
      established: 1953,
      ranking: 15,
      courses: ['Engineering', 'Medical', 'Management'],
      placement: '85%',
      avgPackage: '₹8 LPA',
      rating: 4.3,
      image: 'manipal.jpg',
      featured: false,
      color: 'purple',
      courseTypes: ['Engineering', 'Medical', 'Management', 'Technology']
    },
    {
      id: 6,
      name: 'Vellore Institute of Technology',
      shortName: 'VIT Vellore',
      type: 'Engineering',
      location: 'Vellore',
      established: 1984,
      ranking: 12,
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      placement: '88%',
      avgPackage: '₹9.5 LPA',
      rating: 4.2,
      image: 'vit-vellore.jpg',
      featured: false,
      color: 'orange',
      courseTypes: ['Engineering', 'Technology', 'Management']
    }
  ];

  filters = {
    type: 'All',
    location: 'All',
    ranking: 'All',
    course: 'All'
  };

  filteredColleges = [...this.colleges];
  selectedCourseFilter = '';
  showMobileFilters = false;
  searchQuery = '';

  // Filter options
  collegeTypes = ['All', 'Engineering', 'Medical', 'Management', 'Multi-Disciplinary'];
  locations = ['All', 'New Delhi', 'Bangalore', 'Tiruchirappalli', 'Manipal', 'Vellore'];
  courseTypes = ['All', 'Engineering', 'Medical', 'Management', 'Technology', 'Arts & Science', 'Commerce'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Check for course filter from query params
    this.route.queryParams.subscribe(params => {
      if (params['courseFilter']) {
        this.selectedCourseFilter = params['courseFilter'];
        this.filters.course = params['courseFilter'];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredColleges = this.colleges.filter(college => {
      // Search filter
      const searchMatch = !this.searchQuery ||
                         college.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         college.shortName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         college.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         college.courseTypes.some(course => course.toLowerCase().includes(this.searchQuery.toLowerCase()));

      // Type filter
      const typeMatch = this.filters.type === 'All' || college.type === this.filters.type;

      // Location filter
      const locationMatch = this.filters.location === 'All' || college.location.includes(this.filters.location);

      // Course filter (from course page navigation)
      const courseMatch = this.filters.course === 'All' ||
                          college.courseTypes?.includes(this.filters.course) ||
                          college.type === this.filters.course;

      // Ranking filter
      const rankingMatch = this.filters.ranking === 'All' ||
                          (this.filters.ranking === 'Top 10' && college.ranking <= 10) ||
                          (this.filters.ranking === 'Top 20' && college.ranking <= 20);

      return searchMatch && typeMatch && locationMatch && courseMatch && rankingMatch;
    });
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
    this.router.navigate(['/college', collegeId]);
  }
}
