import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../shared/services/api.service';

interface CollegeFacility {
  icon: string;
  name: string;
  description: string;
}

interface StudentTestimonial {
  name: string;
  course: string;
  year: string;
  image: string;
  rating: number;
  testimonial: string;
  achievement?: string;
}

interface College {
  id: number;
  name: string;
  shortName: string;
  type: string;
  location: string;
  established: number;
  ranking: number;
  courses: string[];
  placement: string;
  avgPackage: string;
  rating: number;
  image: string;
  featured: boolean;
  color: string;
  courseTypes: string[];
  description?: string;
  about_text?: string;
  quick_stats?: {
    campus_size?: string;
    total_students?: string;
    faculty_ratio?: string;
    avg_package?: string;
  };
  facilities?: CollegeFacility[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  admissionProcess?: string[];
  eligibility?: string[];
  highlights?: string[];
  campusSize?: string;
  totalStudents?: string;
  facultyRatio?: string;
  accreditation?: string[];
  testimonials?: StudentTestimonial[];
  achievements?: string[];
  motto?: string;
  vision?: string;
  institutionType?: string;
  affiliated?: string;
}

@Component({
  selector: 'app-college-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './college-detail.component.html',
  styleUrls: ['./college-detail.component.css']
})
export class CollegeDetailComponent implements OnInit {
  colleges = signal<College[]>([]);
  currentCollegeId = signal<number | null>(null);
  loading = signal(true);
  error = signal(false);

  college = computed(() => {
    const id = this.currentCollegeId();
    const collegeList = this.colleges();
    return id ? collegeList.find(c => c.id === id) || null : null;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.currentCollegeId.set(id);
        this.loadCollegeData();
      } else {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  private loadCollegeData(): void {
    this.loading.set(true);
    this.error.set(false);

    const collegeId = this.currentCollegeId();
    if (!collegeId) return;

    this.apiService.getCollege(collegeId).subscribe({
      next: (response) => {
        if (response) {
          const apiCollege = this.mapApiCollegeToInterface(response);
          this.colleges.set([apiCollege]);
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  private mapApiCollegeToInterface(apiCollege: any): College {
    return {
      id: apiCollege.id,
      name: apiCollege.name,
      shortName: apiCollege.short_name || apiCollege.name,
      type: apiCollege.type,
      location: apiCollege.location,
      established: apiCollege.established,
      ranking: apiCollege.ranking || 999,
      courses: Array.isArray(apiCollege.courses) ? apiCollege.courses : [],
      placement: apiCollege.placement || '85%',
      avgPackage: apiCollege.avg_package || 'N/A',
      rating: apiCollege.rating || 4.0,
      image: apiCollege.image || 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: apiCollege.ranking <= 10,
      color: this.getCollegeColor(apiCollege.type),
      courseTypes: [apiCollege.type],
      description: apiCollege.description || `${apiCollege.name} is a premier educational institution offering quality education.`,
      about_text: apiCollege.about_text,
      quick_stats: apiCollege.quick_stats,
      address: apiCollege.address,
      phone: apiCollege.phone,
      email: apiCollege.email,
      website: apiCollege.website,
      campusSize: apiCollege.campus_size,
      totalStudents: apiCollege.total_students,
      facultyRatio: apiCollege.faculty_ratio,
      institutionType: apiCollege.institution_type,
      affiliated: apiCollege.affiliated,
      motto: apiCollege.motto,
      vision: apiCollege.vision,
      facilities: apiCollege.facilities || this.getDefaultFacilities(),
      admissionProcess: apiCollege.admission_process || this.getDefaultAdmissionProcess(),
      eligibility: apiCollege.eligibility || this.getDefaultEligibility(),
      highlights: apiCollege.highlights || this.getDefaultHighlights(),
      accreditation: apiCollege.accreditation || ['UGC Approved', 'NAAC Accredited'],
      testimonials: apiCollege.testimonials || [],
      achievements: apiCollege.achievements || this.getDefaultAchievements()
    };
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

  goBack(): void {
    this.location.back();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToColleges(): void {
    this.router.navigate(['/colleges']);
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(rating));
  }

  getColorClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }

  callCollege(): void {
    const currentCollege = this.college();
    if (currentCollege?.phone) {
      window.open(`tel:${currentCollege.phone}`);
    }
  }

  emailCollege(): void {
    const currentCollege = this.college();
    if (currentCollege?.email) {
      window.open(`mailto:${currentCollege.email}`);
    }
  }

  openWebsite(): void {
    const currentCollege = this.college();
    if (currentCollege?.website) {
      window.open(currentCollege.website, '_blank');
    }
  }

  retryLoad(): void {
    console.log('Retrying to load college data...');
    this.loadCollegeData();
  }

  private getDefaultFacilities(): CollegeFacility[] {
    return [
      { icon: 'library_books', name: 'Central Library', description: 'Well-equipped library with extensive collection' },
      { icon: 'science', name: 'Research Labs', description: 'Modern laboratories for practical learning' },
      { icon: 'sports_soccer', name: 'Sports Complex', description: 'Complete sports facilities for students' },
      { icon: 'restaurant', name: 'Cafeteria', description: 'Hygienic food court with variety of options' },
      { icon: 'local_hospital', name: 'Medical Center', description: '24/7 medical facility for emergencies' },
      { icon: 'wifi', name: 'Wi-Fi Campus', description: 'High-speed internet connectivity throughout campus' }
    ];
  }

  private getDefaultAdmissionProcess(): string[] {
    return [
      'Fill the online application form with required details',
      'Submit necessary documents and certificates',
      'Appear for entrance examination (if applicable)',
      'Attend counseling session based on merit/rank',
      'Complete fee payment and document verification',
      'Confirm admission and join the program'
    ];
  }

  private getDefaultEligibility(): string[] {
    return [
      '10+2 or equivalent examination from recognized board',
      'Minimum 50% marks in qualifying examination',
      'Valid entrance exam score (if applicable)',
      'Age limit as per university norms',
      'Medical fitness certificate'
    ];
  }

  private getDefaultHighlights(): string[] {
    return [
      'Experienced and qualified faculty members',
      'Industry-relevant curriculum and training',
      'Strong placement support and career guidance',
      'Modern infrastructure and learning facilities',
      'Active student clubs and extracurricular activities',
      'Regular industry interactions and guest lectures'
    ];
  }

  private getDefaultAchievements(): string[] {
    return [
      'Consistently high placement rates',
      'Recognition for academic excellence',
      'Active participation in research and innovation',
      'Strong alumni network in various industries'
    ];
  }
}