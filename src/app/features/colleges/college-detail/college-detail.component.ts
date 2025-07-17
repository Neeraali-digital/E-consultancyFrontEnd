import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

interface CampusImage {
  url: string;
  title: string;
  description: string;
}

interface CollegeEvent {
  title: string;
  date: string;
  type: string;
  description: string;
  image: string;
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
  fees: string;
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
  googleMapsUrl?: string;
  testimonials?: StudentTestimonial[];
  campusImages?: CampusImage[];
  upcomingEvents?: CollegeEvent[];
  studentLife?: string[];
  achievements?: string[];
  virtualTourUrl?: string;
  motto?: string;
  vision?: string;
}

@Component({
  selector: 'app-college-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './college-detail.component.html',
  styleUrls: ['./college-detail.component.css']
})
export class CollegeDetailComponent implements OnInit {
  college: College | null = null;
  loading = true;
  error = false;

  // Sample college data - in real app this would come from a service
  private colleges: College[] = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      type: 'Engineering',
      location: 'New Delhi',
      established: 1961,
      ranking: 1,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      fees: '₹2.5 Lakhs/year',
      placement: '95%',
      avgPackage: '₹18 LPA',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true,
      color: 'blue',
      courseTypes: ['Engineering', 'Technology'],
      description: 'Indian Institute of Technology Delhi is one of the premier engineering institutions in India. Established in 1961, IIT Delhi has been a leader in engineering education and research. The institute offers undergraduate, postgraduate, and doctoral programs in various engineering disciplines.',
      address: 'Hauz Khas, New Delhi, Delhi 110016',
      phone: '+91-11-2659-1000',
      email: 'info@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in',
      campusSize: '325 acres',
      totalStudents: '8,000+',
      facultyRatio: '1:8',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8267!2d77.1925!3d28.5458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26d9f7fa2b5%3A0x5b3cf4f8e6b8a8a8!2sIndian%20Institute%20of%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1234567890',
      facilities: [
        { icon: 'library_books', name: 'Central Library', description: 'State-of-the-art library with 500,000+ books and digital resources' },
        { icon: 'science', name: 'Research Labs', description: 'Advanced research laboratories for cutting-edge research' },
        { icon: 'sports_soccer', name: 'Sports Complex', description: 'Olympic-size swimming pool, gymnasium, and sports facilities' },
        { icon: 'restaurant', name: 'Dining Halls', description: 'Multiple dining halls serving nutritious meals' },
        { icon: 'hotel', name: 'Hostels', description: 'Comfortable accommodation for students' },
        { icon: 'local_hospital', name: 'Health Center', description: '24/7 medical facilities and emergency care' },
        { icon: 'wifi', name: 'Wi-Fi Campus', description: 'High-speed internet connectivity across campus' },
        { icon: 'directions_bus', name: 'Transportation', description: 'Campus shuttle and public transport connectivity' }
      ],
      admissionProcess: [
        'JEE Advanced qualification required',
        'Online application submission',
        'Document verification',
        'Seat allocation through JoSAA counseling',
        'Fee payment and admission confirmation'
      ],
      eligibility: [
        '10+2 with Physics, Chemistry, and Mathematics',
        'Minimum 75% marks in 12th standard',
        'JEE Main and JEE Advanced qualification',
        'Age limit: Maximum 25 years'
      ],
      highlights: [
        'Top ranking engineering institute in India',
        'Excellent placement record with top companies',
        'World-class faculty and research facilities',
        'Strong alumni network globally',
        'Industry partnerships and collaborations'
      ],
      accreditation: ['NAAC A++', 'NBA Accredited', 'NIRF Ranking #2'],
      motto: 'Excellence in Action',
      vision: 'To be a global leader in engineering education and research, fostering innovation and creating future leaders.',
      virtualTourUrl: 'https://www.iitd.ac.in/virtual-tour',
      testimonials: [
        {
          name: 'Arjun Sharma',
          course: 'B.Tech Computer Science',
          year: '2024',
          image: 'student-1.jpg',
          rating: 5,
          testimonial: 'IIT Delhi transformed my life completely. The faculty, research opportunities, and peer learning environment here is unmatched. I secured a placement at Google with a 50 LPA package!',
          achievement: 'Google Software Engineer'
        },
        {
          name: 'Priya Patel',
          course: 'M.Tech Mechanical',
          year: '2023',
          image: 'student-2.jpg',
          rating: 5,
          testimonial: 'The research facilities and mentorship at IIT Delhi are world-class. I published 3 papers during my M.Tech and now I\'m pursuing PhD at MIT.',
          achievement: 'MIT PhD Scholar'
        },
        {
          name: 'Rahul Kumar',
          course: 'B.Tech Electrical',
          year: '2024',
          image: 'student-3.jpg',
          rating: 5,
          testimonial: 'IIT Delhi is not just about academics - the campus life, clubs, and friendships I made here will last a lifetime. Proud to be an IITian!',
          achievement: 'Tesla Engineer'
        }
      ],
      campusImages: [
        { url: 'iit-delhi-main-gate.jpg', title: 'Main Gate', description: 'Iconic entrance to IIT Delhi campus' },
        { url: 'iit-delhi-library.jpg', title: 'Central Library', description: 'State-of-the-art library with 500,000+ books' },
        { url: 'iit-delhi-hostel.jpg', title: 'Student Hostels', description: 'Comfortable accommodation for students' },
        { url: 'iit-delhi-lab.jpg', title: 'Research Labs', description: 'Advanced research laboratories' },
        { url: 'iit-delhi-sports.jpg', title: 'Sports Complex', description: 'Olympic-size swimming pool and sports facilities' },
        { url: 'iit-delhi-auditorium.jpg', title: 'Dogra Hall', description: 'Main auditorium for events and ceremonies' }
      ],
      upcomingEvents: [
        {
          title: 'Rendezvous 2024',
          date: '2024-10-15',
          type: 'Cultural Festival',
          description: 'Annual cultural festival with performances, competitions, and celebrity shows',
          image: 'rendezvous-2024.jpg'
        },
        {
          title: 'Tech Symposium',
          date: '2024-11-20',
          type: 'Technical Event',
          description: 'National level technical symposium with industry experts and research presentations',
          image: 'tech-symposium.jpg'
        },
        {
          title: 'Placement Drive',
          date: '2024-12-01',
          type: 'Career Event',
          description: 'Campus placement drive with top companies like Google, Microsoft, Amazon',
          image: 'placement-drive.jpg'
        }
      ],
      studentLife: [
        'Active student clubs and societies covering technology, arts, sports, and social causes',
        'Annual cultural festival "Rendezvous" with celebrity performances and competitions',
        'Inter-hostel competitions in sports, debates, and cultural activities',
        'Student-run startups and entrepreneurship cell with funding support',
        'Regular guest lectures by industry leaders and Nobel laureates',
        'International exchange programs with top universities worldwide'
      ],
      achievements: [
        'Ranked #2 in NIRF Engineering Rankings 2024',
        '95% placement rate with average package of ₹18 LPA',
        'Over 200 patents filed by faculty and students in last 5 years',
        'Alumni include CEOs of major tech companies and government officials',
        'Research funding of ₹500+ crores from government and industry',
        'International collaborations with MIT, Stanford, and other top universities'
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
      fees: '₹1.5 Lakhs/year',
      placement: '100%',
      avgPackage: '₹25 LPA',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true,
      color: 'red',
      courseTypes: ['Medical'],
      description: 'All India Institute of Medical Sciences (AIIMS) New Delhi is India\'s premier medical institution. Established in 1956, AIIMS has been at the forefront of medical education, research, and patient care. The institute is known for producing some of the finest medical professionals in the country.',
      address: 'Ansari Nagar, New Delhi, Delhi 110029',
      phone: '+91-11-2658-8500',
      email: 'info@aiims.edu',
      website: 'https://www.aiims.edu',
      campusSize: '200 acres',
      totalStudents: '3,000+',
      facultyRatio: '1:5',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8267!2d77.2085!3d28.5672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sAll%20India%20Institute%20of%20Medical%20Sciences!5e0!3m2!1sen!2sin!4v1234567890',
      facilities: [
        { icon: 'local_hospital', name: 'Super Specialty Hospital', description: '1,700+ bed hospital with advanced medical facilities' },
        { icon: 'biotech', name: 'Research Centers', description: 'State-of-the-art research facilities and laboratories' },
        { icon: 'library_books', name: 'Medical Library', description: 'Comprehensive medical literature and digital resources' },
        { icon: 'school', name: 'Simulation Labs', description: 'Advanced medical simulation and training facilities' },
        { icon: 'emergency', name: 'Trauma Center', description: 'Level 1 trauma center with emergency services' },
        { icon: 'medication', name: 'Pharmacy', description: 'In-house pharmacy with all essential medicines' },
        { icon: 'hotel', name: 'Hostels', description: 'Separate hostels for medical students' },
        { icon: 'restaurant', name: 'Cafeteria', description: 'Multiple dining options for students and staff' }
      ],
      admissionProcess: [
        'NEET UG qualification required',
        'AIIMS entrance exam (if applicable)',
        'Online application submission',
        'Document verification',
        'Counseling and seat allocation'
      ],
      eligibility: [
        '10+2 with Physics, Chemistry, Biology',
        'Minimum 50% marks in 12th standard',
        'NEET UG qualification mandatory',
        'Age limit: 17-25 years'
      ],
      highlights: [
        'India\'s premier medical institution',
        'Excellent clinical exposure and training',
        'World-renowned faculty and researchers',
        'State-of-the-art medical facilities',
        'Strong research and publication record'
      ],
      accreditation: ['MCI Approved', 'NAAC A++', 'WHO Recognition']
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
      fees: '₹24 Lakhs/year',
      placement: '100%',
      avgPackage: '₹35 LPA',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true,
      color: 'green',
      courseTypes: ['Management'],
      description: 'Indian Institute of Management Bangalore is one of India\'s premier business schools. Established in 1973, IIM Bangalore has consistently been ranked among the top management institutes in the country. The institute offers world-class management education and has a strong alumni network in corporate leadership positions.',
      address: 'Bannerghatta Road, Bangalore, Karnataka 560076',
      phone: '+91-80-2699-3000',
      email: 'info@iimb.ac.in',
      website: 'https://www.iimb.ac.in',
      campusSize: '100 acres',
      totalStudents: '1,500+',
      facultyRatio: '1:6',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267!2d77.6033!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b7c0d5f5f5f%3A0x5b3cf4f8e6b8a8a8!2sIndian%20Institute%20of%20Management%20Bangalore!5e0!3m2!1sen!2sin!4v1234567890',
      facilities: [
        { icon: 'business', name: 'Management Labs', description: 'State-of-the-art business simulation and analytics labs' },
        { icon: 'library_books', name: 'Business Library', description: 'Comprehensive business literature and case study collection' },
        { icon: 'meeting_room', name: 'Conference Halls', description: 'Modern conference facilities for seminars and events' },
        { icon: 'computer', name: 'IT Infrastructure', description: 'Advanced computing facilities and high-speed internet' },
        { icon: 'restaurant', name: 'Dining Complex', description: 'Multiple dining options and cafeterias' },
        { icon: 'hotel', name: 'Student Housing', description: 'Comfortable accommodation for MBA students' },
        { icon: 'fitness_center', name: 'Recreation Center', description: 'Gymnasium, sports facilities, and wellness center' },
        { icon: 'local_parking', name: 'Parking', description: 'Ample parking space for students and visitors' }
      ],
      admissionProcess: [
        'CAT exam qualification required',
        'Written Ability Test (WAT)',
        'Personal Interview (PI)',
        'Academic and work experience evaluation',
        'Final merit list and admission'
      ],
      eligibility: [
        'Bachelor\'s degree in any discipline',
        'Minimum 50% marks in graduation',
        'Valid CAT score',
        'Work experience preferred but not mandatory'
      ],
      highlights: [
        'Top-ranked business school in India',
        'Excellent corporate placements',
        'World-class faculty and curriculum',
        'Strong industry connections',
        'Global exchange programs'
      ],
      accreditation: ['AACSB', 'EQUIS', 'AMBA Triple Crown']
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
      fees: '₹1.8 Lakhs/year',
      placement: '92%',
      avgPackage: '₹12 LPA',
      rating: 4.5,
      image: 'nit-trichy.jpg',
      featured: false,
      color: 'blue',
      courseTypes: ['Engineering', 'Technology', 'Management'],
      description: 'National Institute of Technology Tiruchirappalli is one of India\'s premier technical institutions. Established in 1964, NIT Trichy has been consistently ranked among the top engineering colleges in India. The institute is known for its excellent academic programs, research facilities, and strong industry connections.',
      address: 'NIT Campus, Tiruchirappalli, Tamil Nadu 620015',
      phone: '+91-431-250-3000',
      email: 'info@nitt.edu',
      website: 'https://www.nitt.edu',
      campusSize: '800 acres',
      totalStudents: '6,000+',
      facultyRatio: '1:10',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8267!2d78.8145!3d10.7590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf54e94b3c5c5%3A0x5b3cf4f8e6b8a8a8!2sNational%20Institute%20of%20Technology%20Tiruchirappalli!5e0!3m2!1sen!2sin!4v1234567890',
      facilities: [
        { icon: 'science', name: 'Engineering Labs', description: 'Well-equipped laboratories for all engineering disciplines' },
        { icon: 'library_books', name: 'Central Library', description: 'Extensive collection of technical books and journals' },
        { icon: 'computer', name: 'Computer Center', description: 'High-performance computing facilities' },
        { icon: 'sports_soccer', name: 'Sports Complex', description: 'Comprehensive sports and recreational facilities' },
        { icon: 'hotel', name: 'Hostels', description: 'Comfortable accommodation for students' },
        { icon: 'restaurant', name: 'Mess Facilities', description: 'Hygienic dining facilities with varied menu' },
        { icon: 'local_hospital', name: 'Health Center', description: 'Medical facilities and health services' },
        { icon: 'directions_bus', name: 'Transport', description: 'Campus transportation and connectivity' }
      ],
      admissionProcess: [
        'JEE Main qualification required',
        'JoSAA counseling participation',
        'Document verification',
        'Seat allocation and confirmation',
        'Fee payment and admission'
      ],
      eligibility: [
        '10+2 with Physics, Chemistry, Mathematics',
        'Minimum 75% marks in 12th standard',
        'Valid JEE Main score',
        'Age limit as per JEE norms'
      ],
      highlights: [
        'Premier National Institute of Technology',
        'Strong placement record with top companies',
        'Excellent research and innovation culture',
        'Beautiful campus with modern facilities',
        'Active student community and clubs'
      ],
      accreditation: ['NAAC A++', 'NBA Accredited', 'NIRF Ranking #9']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const collegeId = +params['id'];
      this.loadCollegeDetails(collegeId);
    });
  }

  private loadCollegeDetails(id: number): void {
    this.loading = true;
    this.error = false;

    // Simulate API call delay
    setTimeout(() => {
      const foundCollege = this.colleges.find(c => c.id === id);
      if (foundCollege) {
        this.college = foundCollege;
        this.loading = false;
      } else {
        this.error = true;
        this.loading = false;
      }
    }, 500);
  }

  goBack(): void {
    console.log('Back button clicked');
    // Try using router navigation as fallback
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/colleges']);
    }
  }

  navigateToColleges(): void {
    this.router.navigate(['/colleges']);
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

  getStarArray(rating: number): boolean[] {
    // Returns array of 5 booleans: true for filled stars, false for empty stars
    // Example: rating 4.8 -> [true, true, true, true, false]
    // Example: rating 5.0 -> [true, true, true, true, true]
    return Array(5).fill(false).map((_, index) => index < Math.floor(rating));
  }

  openWebsite(): void {
    if (this.college?.website) {
      window.open(this.college.website, '_blank');
    }
  }

  callCollege(): void {
    if (this.college?.phone) {
      window.open(`tel:${this.college.phone}`);
    }
  }

  emailCollege(): void {
    if (this.college?.email) {
      window.open(`mailto:${this.college.email}`);
    }
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
