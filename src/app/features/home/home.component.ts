import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAnimationDirective } from '../../shared/directives/counter-animation.directive';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CounterAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  router = inject(Router)

  // Dashboard stats
  dashboardStats: any = {
    totalColleges: 0,
    totalCourses: 0,
    totalStudents: 0,
    totalApplications: 0
  };

  // Recent colleges and courses
  featuredColleges: any[] = [];
  popularCourses: any[] = [];
  recentBlogs: any[] = [];

  loading = true;

  // Carousel data for consultancy ads - updated to use slide1 and slide2 images
  consultancyAds = [
    {
      id: 1,
      title: 'Slide 1',
      subtitle: '',
      description: '',
      image: 'assets/images/slide1.png',
      buttonText: '',
      bgGradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Slide 2',
      subtitle: '',
      description: '',
      image: 'assets/images/slide2.png',
      buttonText: '',
      bgGradient: 'from-red-500 to-pink-600'
    }
  ];

  // Student reviews data
  studentReviews = [
    {
      id: 1,
      name: 'Priyanka Sharma',
      course: 'MBA',
      college: 'Christ University',
      image: './../../../assets/images/R3.jpeg',
      rating: 5,
      review: 'My brother and I got admission through Wayzon Education Consultancy. They gave us clear guidance and great service, helping us choose the right college and course within our budget.',
      year: '2024'
    },
    {
      id: 2,
      name: 'Arshita Singh',
      course: 'Engineering',
      college: 'Ramaiha College',
      image: '../../../../assets/images/R6.jpeg',
      rating: 5,
      review: 'I was very selective and aiming for specific colleges in Karnataka, with low chances of admission. I was a bit tense, but the team Wayzon was very confident and handled everything smoothly over the phone and online, without visit their office.',
      year: '2023'
    },
    {
      id: 3,
      name: 'Dr.Pankaj',
      course: 'MS Ortho',
      college: 'Vydehi Medical College',
      image: '../../../../assets/images/R7.jpeg',
      rating: 5,
      review: 'Professional guidance and excellent support. EduConsult helped me secure admission in my dream college with scholarship I heard about Wayzon from my batchmate. Reliable medical PG consultancies are rare, but this team is expert in MD/MS admissions. I have referred many doctors, and all were happy with their strong college connections and trustworthy financial dealings.',
      year: '2025'
    },
    {
      id: 4,
      name: 'Sarah John',
      course: 'BSc Nursing',
      college: 'BGS Medical Colege',
      image: './../../../assets/images/R2.jpeg',
      rating: 4,
      review: 'I completed my nursing graduation 5 years ago and now work in the UK. In 2016, I didn’t know much about nursing colleges in Bangalore, but I wanted to study there. Wayzon helped me and my family with everything—from college selection to campus tours and education loans. I’m very happy. Thanks, Wayzon!',
      year: '2020'
    },
    {
      id: 5,
      name: 'Ritu Arora',
      course: 'MBBS',
      college: 'Akash Medical College',
      image: './../../../assets/images/R4.jpeg',
      rating: 5,
      review: 'I had a great experience with Wayzon — everything was smooth and stress-free. Being from North India, their support felt like having local guardians. I feel its my duty to share this with anyone looking for admission in Bengaluru. ',
      year: '2024'
    },
    {
      id: 6,
      name: 'Harshitha Gowda',
      course: 'MBBS',
      college: 'Altai state medical University',
      image: './../../../assets/images/R5.jpeg',
      rating: 5,
      review: 'I am from Bengaluru and dreamed of studying MBBS abroad. With a low NEET score and a limited budget, a local management seat wasnt possible. I visited Wayzon to explore approved MBBS options abroad and was fully satisfied with their clear guidance. Now, I am a 4th-year student in Russia.',
      year: '2025'
    }
  ];

  // Current carousel slide
  currentSlide = 0;

  // Current review index for auto-scroll
  currentReviewIndex = 0;

  // Show more programs toggle
  showMorePrograms = false;

  premiumPrograms = [
    {
      name: 'MEDICAL',
      icon: 'medical_services',
      color: 'from-red-500 to-red-700',
      textColor: 'text-red-100',
      btnColor: 'text-red-700',
      btnHover: 'hover:bg-red-50',
      description: 'MBBS, BDS, and medical courses with guaranteed admission in top medical colleges.',
      benefits: ['AIIMS, JIPMER & Top Medical Colleges', 'NEET Counseling Support']
    },
    {
      name: 'DENTAL',
      icon: 'health_and_safety',
      color: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-100',
      btnColor: 'text-blue-700',
      btnHover: 'hover:bg-blue-50',
      description: 'BDS and dental programs with direct admission to top dental colleges.',
      benefits: ['Top Dental Colleges', 'Direct Admission Available']
    },
    {
      name: 'AYURVEDA',
      icon: 'spa',
      color: 'from-green-500 to-green-700',
      textColor: 'text-green-100',
      btnColor: 'text-green-700',
      btnHover: 'hover:bg-green-50',
      description: 'BAMS and Ayurvedic medicine programs from recognized institutions.',
      benefits: ['Recognized Ayurvedic Colleges', 'Traditional Medicine Focus']
    },
    {
      name: 'HOMEOPATHY',
      icon: 'healing',
      color: 'from-purple-500 to-purple-700',
      textColor: 'text-purple-100',
      btnColor: 'text-purple-700',
      btnHover: 'hover:bg-purple-50',
      description: 'BHMS and homeopathic medicine programs with holistic healthcare approach.',
      benefits: ['Accredited Homeopathy Colleges', 'Holistic Medicine Training']
    },
    {
      name: 'NATUROPATHY',
      icon: 'nature_people',
      color: 'from-teal-500 to-teal-700',
      textColor: 'text-teal-100',
      btnColor: 'text-teal-700',
      btnHover: 'hover:bg-teal-50',
      description: 'BNYS and naturopathic medicine programs focusing on natural healing.',
      benefits: ['Natural Healing Colleges', 'Yoga & Natural Therapy']
    },
    {
      name: 'ENGINEERING',
      icon: 'engineering',
      color: 'from-orange-500 to-orange-700',
      textColor: 'text-orange-100',
      btnColor: 'text-orange-700',
      btnHover: 'hover:bg-orange-50',
      description: 'Premier engineering programs with 100% placement guarantee and industry partnerships.',
      benefits: ['IIT, NIT & Top Private Colleges', 'Direct Admission Available']
    },
    {
      name: 'MANAGEMENT',
      icon: 'business_center',
      color: 'from-indigo-500 to-indigo-700',
      textColor: 'text-indigo-100',
      btnColor: 'text-indigo-700',
      btnHover: 'hover:bg-indigo-50',
      description: 'MBA and management programs from IIMs and top business schools worldwide.',
      benefits: ['IIM, ISB & Top B-Schools', 'CAT, GMAT Preparation']
    },
    {
      name: 'COMMERCE',
      icon: 'account_balance_wallet',
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-50',
      btnColor: 'text-blue-600',
      btnHover: 'hover:bg-blue-50',
      description: 'B.Com, M.Com, and professional accounting courses like CA, CS, and CMA.',
      benefits: ['Professional Accounting Focus', 'Corporate Placements']
    },
    {
      name: 'NURSING',
      icon: 'local_hospital',
      color: 'from-pink-500 to-pink-700',
      textColor: 'text-pink-100',
      btnColor: 'text-pink-700',
      btnHover: 'hover:bg-pink-50',
      description: 'BSc Nursing and GNM programs with guaranteed placements in top hospitals.',
      benefits: ['Top Nursing Colleges', 'Hospital Placement Guarantee']
    },
    {
      name: 'ALLIED HEALTH SCIENCES',
      icon: 'biotech',
      color: 'from-cyan-500 to-cyan-700',
      textColor: 'text-cyan-100',
      btnColor: 'text-cyan-700',
      btnHover: 'hover:bg-cyan-50',
      description: 'Specialized healthcare programs including lab technology, radiology, and more.',
      benefits: ['Medical Lab Technology', 'Radiology & Imaging']
    },
    {
      name: 'PARAMEDICAL DIPLOMA',
      icon: 'medical_information',
      color: 'from-rose-500 to-rose-700',
      textColor: 'text-rose-100',
      btnColor: 'text-rose-700',
      btnHover: 'hover:bg-rose-50',
      description: 'Hands-on diploma courses for specialized medical support roles.',
      benefits: ['Short-term Career Path', 'Clinical Experience']
    },
    {
      name: 'PHARMACY',
      icon: 'medication',
      color: 'from-emerald-500 to-emerald-700',
      textColor: 'text-emerald-100',
      btnColor: 'text-emerald-700',
      btnHover: 'hover:bg-emerald-50',
      description: 'B.Pharm and D.Pharm programs with pharmaceutical industry connections.',
      benefits: ['Top Pharmacy Colleges', 'Industry Partnerships']
    },
    {
      name: 'LAW',
      icon: 'gavel',
      color: 'from-amber-500 to-amber-700',
      textColor: 'text-amber-100',
      btnColor: 'text-amber-700',
      btnHover: 'hover:bg-amber-50',
      description: 'LLB and integrated law programs from National Law Universities.',
      benefits: ['National Law Universities', 'CLAT Preparation Support']
    },
    {
      name: 'PSYCHOLOGY',
      icon: 'psychology',
      color: 'from-violet-500 to-violet-700',
      textColor: 'text-violet-100',
      btnColor: 'text-violet-700',
      btnHover: 'hover:bg-violet-50',
      description: 'Learn human behavior and mental health through clinical psychology.',
      benefits: ['Clinical Training', 'Mental Health Focus']
    },
    {
      name: 'LIFE SCIENCE',
      icon: 'science',
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-50',
      btnColor: 'text-green-600',
      btnHover: 'hover:bg-green-50',
      description: 'Deep dive into biological systems, biotechnology, and genetics.',
      benefits: ['Research Opportunities', 'Biotech Innovation']
    },
    {
      name: 'PHYSIOTHERAPY',
      icon: 'accessibility',
      color: 'from-lime-500 to-lime-700',
      textColor: 'text-lime-100',
      btnColor: 'text-lime-700',
      btnHover: 'hover:bg-lime-50',
      description: 'BPT programs focusing on rehabilitation and physical therapy.',
      benefits: ['Top Physiotherapy Colleges', 'Clinical Training Programs']
    },
    {
      name: 'ARTS',
      icon: 'palette',
      color: 'from-fuchsia-500 to-fuchsia-700',
      textColor: 'text-fuchsia-100',
      btnColor: 'text-fuchsia-700',
      btnHover: 'hover:bg-fuchsia-50',
      description: 'Express creativity through fine arts, literature, and humanities.',
      benefits: ['Creative Development', 'Global Certifications']
    },
    {
      name: 'SCIENCE',
      icon: 'biotech',
      color: 'from-sky-500 to-sky-700',
      textColor: 'text-sky-100',
      btnColor: 'text-sky-700',
      btnHover: 'hover:bg-sky-50',
      description: 'Fundamental and advanced science programs in physics, chemistry, and math.',
      benefits: ['Core Research Skills', 'Academic Excellence']
    },
    {
      name: 'COMPUTER APPLICATION',
      icon: 'computer',
      color: 'from-blue-600 to-indigo-800',
      textColor: 'text-blue-100',
      btnColor: 'text-blue-800',
      btnHover: 'hover:bg-blue-50',
      description: 'Master software development, AI, and data science (BCA/MCA).',
      benefits: ['IT Industry Prep', 'Modern Curriculum']
    },
    {
      name: 'FASHION DESIGNING',
      icon: 'checkroom',
      color: 'from-pink-600 to-fuchsia-700',
      textColor: 'text-pink-100',
      btnColor: 'text-pink-700',
      btnHover: 'hover:bg-pink-50',
      description: 'Innovative courses in apparel design and fashion industry management.',
      benefits: ['Industry Portfolios', 'Runway Opportunities']
    },
    {
      name: 'DESIGN',
      icon: 'brush',
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-100',
      btnColor: 'text-rose-700',
      btnHover: 'hover:bg-rose-50',
      description: 'Graphic, interior, and product design with creative software mastery.',
      benefits: ['Studio Training', 'Creative Problem Solving']
    },
    {
      name: 'ARCHITECTURE',
      icon: 'architecture',
      color: 'from-orange-600 to-amber-700',
      textColor: 'text-orange-100',
      btnColor: 'text-orange-700',
      btnHover: 'hover:bg-orange-50',
      description: 'B.Arch programs blending artistic vision with engineering precision.',
      benefits: ['Council Approval', 'Practical Projects']
    },
    {
      name: 'JOURNALISM',
      icon: 'newspaper',
      color: 'from-teal-600 to-emerald-800',
      textColor: 'text-teal-100',
      btnColor: 'text-teal-800',
      btnHover: 'hover:bg-teal-50',
      description: 'Professional media, broadcasting, and digital journalism programs.',
      benefits: ['Studio Exposure', 'Media Internships']
    },
    {
      name: 'HOSPITAL ADMINISTRATION',
      icon: 'corporate_fare',
      color: 'from-sky-600 to-blue-700',
      textColor: 'text-sky-100',
      btnColor: 'text-blue-800',
      btnHover: 'hover:bg-sky-50',
      description: 'Master the management of healthcare facilities and services.',
      benefits: ['Hospital Placements', 'Leadership Skills']
    },
    {
      name: 'SOCIAL WORK',
      icon: 'volunteer_activism',
      color: 'from-red-600 to-rose-700',
      textColor: 'text-red-100',
      btnColor: 'text-red-700',
      btnHover: 'hover:bg-red-50',
      description: 'Empower communities through professional social work and advocacy.',
      benefits: ['Community Projects', 'NGO Connections']
    },
    {
      name: 'POLYTECHNIC',
      icon: 'settings',
      color: 'from-violet-600 to-purple-800',
      textColor: 'text-violet-100',
      btnColor: 'text-violet-800',
      btnHover: 'hover:bg-violet-50',
      description: 'Technical diploma courses in various engineering and technology branches.',
      benefits: ['Technical Skills', 'Job Guaranteed']
    }
  ];

  // Intervals for auto-scroll
  private carouselInterval: any;
  private reviewInterval: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.startCarouselAutoScroll();
    // this.startReviewAutoScroll();
    this.loadHomeData();
    this.loadAdvertisements();
  }

  loadHomeData() {
    this.loading = true;

    // Load dashboard stats
    this.apiService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
      },
      error: (error) => console.error('Error loading dashboard stats:', error)
    });

    // Load featured colleges
    this.apiService.getColleges({ limit: 6, status: 'active' }).subscribe({
      next: (colleges) => {
        this.featuredColleges = colleges.results || colleges;
      },
      error: (error) => console.error('Error loading colleges:', error)
    });

    // Load popular courses
    this.apiService.getCourses({ limit: 8, status: 'active' }).subscribe({
      next: (courses) => {
        this.popularCourses = courses.results || courses;
      },
      error: (error) => console.error('Error loading courses:', error)
    });

    // Load recent blogs
    this.apiService.getBlogs({ limit: 3, status: 'published' }).subscribe({
      next: (blogs) => {
        this.recentBlogs = blogs.results || blogs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
    });
  }

  loadAdvertisements() {
    this.apiService.getAdvertisements({ is_active: true }).subscribe({
      next: (response) => {
        const ads = response.results || response || [];
        if (ads.length > 0) {
          this.consultancyAds = ads.map((ad: any) => ({
            id: ad.id,
            title: ad.title,
            subtitle: ad.subtitle,
            description: ad.description,
            image: ad.image,
            buttonText: ad.button_text,
            bgGradient: 'from-blue-600 to-purple-600'
          }));
        }
      },
      error: (error) => console.error('Error loading advertisements:', error)
    });
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
    }
  }

  // Carousel methods
  startCarouselAutoScroll() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.consultancyAds.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.consultancyAds.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // Review auto-scroll methods
  // startReviewAutoScroll() {
  //   this.reviewInterval = setInterval(() => {
  //     this.currentReviewIndex = (this.currentReviewIndex + 1) % this.studentReviews.length;
  //   }, 10000); // Change review every 4 seconds
  // }

  // Generate star rating array
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }

  // Get visible reviews for 3-column display
  getVisibleReviews() {
    const reviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (this.currentReviewIndex + i) % this.studentReviews.length;
      reviews.push(this.studentReviews[index]);
    }
    return reviews;
  }

  // Review navigation methods
  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.studentReviews.length;
  }

  prevReview() {
    this.currentReviewIndex = this.currentReviewIndex === 0 ?
      this.studentReviews.length - 1 : this.currentReviewIndex - 1;
  }

  goToReview(index: number) {
    this.currentReviewIndex = index;
  }

  navigateToCOllages() {
    console.log('clickccccccccccccccccc')
    this.router.navigate(['/colleges']);
  }

  toggleMorePrograms() {
    this.showMorePrograms = !this.showMorePrograms;
  }

}
