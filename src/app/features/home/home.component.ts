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

  navigateToCOllages(){
    console.log('clickccccccccccccccccc')
    this.router.navigate(['/colleges']);
  }

  toggleMorePrograms() {
    this.showMorePrograms = !this.showMorePrograms;
  }

}
