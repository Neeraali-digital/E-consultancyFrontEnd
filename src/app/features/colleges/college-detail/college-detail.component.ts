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

  private staticColleges: College[] = [
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
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: true,
      color: 'blue',
      courseTypes: ['Engineering', 'Technology'],
      description: 'Indian Institute of Technology Delhi is one of the premier engineering institutions in India.',
      address: 'Hauz Khas, New Delhi, Delhi 110016',
      phone: '+91-11-2659-1000',
      email: 'info@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in',
      campusSize: '325 acres',
      totalStudents: '8,000+',
      facultyRatio: '1:8',
      institutionType: 'Government',
      affiliated: 'UGC',
      motto: 'Excellence in Action',
      vision: 'To be a global leader in engineering education and research.',
      facilities: [
        { icon: 'library_books', name: 'Central Library', description: 'State-of-the-art library with 500,000+ books' },
        { icon: 'science', name: 'Research Labs', description: 'Advanced research laboratories' },
        { icon: 'sports_soccer', name: 'Sports Complex', description: 'Olympic-size swimming pool and multi-sport facilities' },
        { icon: 'restaurant', name: 'Food Courts', description: 'Multiple dining options with diverse cuisines' },
        { icon: 'local_hospital', name: 'Health Center', description: '24/7 medical facility with qualified doctors' },
        { icon: 'wifi', name: 'Smart Campus', description: 'High-speed Wi-Fi and digital learning infrastructure' }
      ],
      admissionProcess: [
        'JEE Advanced qualification required',
        'Online application submission through official portal',
        'Document verification and seat allotment',
        'Fee payment and admission confirmation',
        'Hostel allocation (if required)',
        'Orientation program attendance'
      ],
      eligibility: [
        '10+2 with Physics, Chemistry, and Mathematics',
        'Minimum 75% marks in 12th standard (70% for SC/ST)',
        'Valid JEE Advanced rank',
        'Age limit: Maximum 25 years (30 for SC/ST)',
        'Medical fitness certificate'
      ],
      highlights: [
        'Top ranking engineering institute in India',
        'Excellent placement record with top companies',
        'World-class faculty and research facilities',
        'Strong industry partnerships and collaborations',
        'Active alumni network in leading positions globally',
        'Regular international exchange programs'
      ],
      accreditation: ['NAAC A++', 'NBA Accredited'],
      testimonials: [
        {
          name: 'Arjun Sharma',
          course: 'B.Tech Computer Science',
          year: '2024',
          image: 'student-1.jpg',
          rating: 5,
          testimonial: 'IIT Delhi transformed my life completely.',
          achievement: 'Google Software Engineer'
        }
      ],
      achievements: [
        'Ranked #2 in NIRF Engineering Rankings 2024',
        'Over 95% placement rate'
      ]
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
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: true,
      color: 'red',
      courseTypes: ['Medical'],
      description: 'All India Institute of Medical Sciences (AIIMS) Delhi is India\'s premier medical institution.',
      address: 'Ansari Nagar, New Delhi, Delhi 110029',
      phone: '+91-11-2658-8500',
      email: 'info@aiims.edu',
      website: 'https://www.aiims.edu',
      campusSize: '200 acres',
      totalStudents: '3,000+',
      facultyRatio: '1:5',
      institutionType: 'Government',
      affiliated: 'MCI',
      motto: 'Sarve santu niramayah',
      vision: 'To be a global leader in medical education and healthcare.',
      facilities: [
        { icon: 'local_hospital', name: 'Super Specialty Hospital', description: '1,700+ bed hospital with all specialties' },
        { icon: 'science', name: 'Medical Labs', description: 'Advanced diagnostic and research laboratories' },
        { icon: 'library_books', name: 'Medical Library', description: 'Comprehensive medical literature and journals' },
        { icon: 'school', name: 'Simulation Labs', description: 'High-tech medical simulation training facilities' },
        { icon: 'restaurant', name: 'Mess Facilities', description: 'Nutritious meals for students and staff' },
        { icon: 'home', name: 'Hostel Accommodation', description: 'Comfortable residential facilities' }
      ],
      admissionProcess: [
        'NEET UG qualification required',
        'All India counseling participation',
        'Document verification at reporting center',
        'Medical examination and fitness certificate',
        'Fee payment and course registration',
        'Hostel allotment and orientation program'
      ],
      eligibility: [
        '10+2 with Physics, Chemistry, Biology and English',
        'Minimum 50% marks in PCB (40% for SC/ST/OBC)',
        'Valid NEET UG score',
        'Age: Minimum 17 years, Maximum 25 years (30 for reserved)',
        'Indian citizenship or OCI status'
      ],
      highlights: [
        'India\'s premier medical institution',
        'Excellent clinical exposure and training',
        'Renowned faculty and medical professionals',
        'State-of-the-art medical equipment and facilities',
        'Strong research culture and publications',
        'High success rate in PG medical entrance exams'
      ],
      accreditation: ['MCI Approved', 'NAAC A++'],
      testimonials: [],
      achievements: [
        'Ranked #1 in medical education in India',
        'Leading medical research institution',
        'Highest number of medical specialties under one roof'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('College detail component received ID:', id);
      if (id) {
        this.currentCollegeId.set(id);
        this.loadCollegeData();
      } else {
        console.error('No valid college ID found in route params');
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  private loadCollegeData(): void {
    this.loading.set(true);
    this.error.set(false);
    
    const collegeId = this.currentCollegeId();
    console.log('Loading college data for ID:', collegeId);
    
    if (!collegeId) {
      console.error('No college ID provided');
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    // First try to get individual college from API
    console.log('Attempting to fetch college from API...');
    this.apiService.getCollege(collegeId).subscribe({
      next: (response) => {
        console.log('API response for college:', response);
        if (response) {
          // Map API response to our College interface
          const apiCollege = this.mapApiCollegeToInterface(response);
          console.log('Mapped college data:', apiCollege);
          this.colleges.set([apiCollege]);
        } else {
          console.log('No response from API, trying static data...');
          this.tryStaticData(collegeId);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading college from API:', error);
        // Fallback to static data or all colleges API
        this.tryStaticData(collegeId);
      }
    });
  }

  private tryStaticData(collegeId: number): void {
    console.log('Trying static data for college ID:', collegeId);
    
    // Check if ID is in the adjusted range (static data with offset)
    const adjustedStaticId = collegeId - 1000;
    const staticCollege = this.staticColleges.find(c => c.id === adjustedStaticId);
    if (staticCollege) {
      console.log('Found college in static data:', staticCollege.name);
      this.colleges.set([{ ...staticCollege, id: collegeId }]);
      this.loading.set(false);
      return;
    }

    console.log('College not found in static data, trying all colleges API...');
    // Try to get all colleges and find the one
    this.apiService.getColleges().subscribe({
      next: (response) => {
        let apiColleges = response.results || response;
        if (apiColleges && apiColleges.length > 0) {
          const mappedColleges = apiColleges.map((college: any) => this.mapApiCollegeToInterface(college));
          const foundCollege = mappedColleges.find((c: College) => c.id === collegeId);
          
          if (foundCollege) {
            console.log('Found college in API data:', foundCollege.name);
            this.colleges.set([foundCollege]);
          } else {
            console.error('College not found in API data either');
            this.error.set(true);
          }
        } else {
          console.error('No colleges returned from API');
          this.error.set(true);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading colleges:', error);
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