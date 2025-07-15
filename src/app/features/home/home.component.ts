import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAnimationDirective } from '../../shared/directives/counter-animation.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CounterAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Carousel data for consultancy ads
  consultancyAds = [
    {
      id: 1,
      title: 'Engineering Excellence',
      subtitle: 'Top Engineering Colleges',
      description: 'Get direct admission to premier engineering institutions with 100% placement guarantee.',
      image: '',
      buttonText: 'Explore Engineering',
      bgGradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Medical Dreams',
      subtitle: 'MBBS & Medical Courses',
      description: 'Secure your seat in top medical colleges with our expert guidance and support.',
      image: '',
      buttonText: 'Explore Medical',
      bgGradient: 'from-red-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Management Masters',
      subtitle: 'MBA & Management Programs',
      description: 'Join prestigious business schools and accelerate your career in management.',
      image: '',
      buttonText: 'Explore MBA',
      bgGradient: 'from-green-500 to-teal-600'
    },
    {
      id: 4,
      title: 'Technology Future',
      subtitle: 'IT & Computer Science',
      description: 'Shape the future with cutting-edge technology programs and industry partnerships.',
      image: '',
      buttonText: 'Explore Tech',
      bgGradient: 'from-indigo-500 to-blue-600'
    }
  ];

  // Student reviews data
  studentReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      course: 'B.Tech Computer Science',
      college: 'IIT Delhi',
      image: '',
      rating: 5,
      review: 'EduConsult made my dream of studying at IIT a reality. Their guidance was exceptional and the process was completely transparent.',
      year: '2024'
    },
    {
      id: 2,
      name: 'Rahul Patel',
      course: 'MBBS',
      college: 'AIIMS Mumbai',
      image: '',
      rating: 5,
      review: 'Thanks to EduConsult, I got admission in AIIMS. The counselors were very supportive throughout the entire journey.',
      year: '2024'
    },
    {
      id: 3,
      name: 'Ananya Singh',
      course: 'MBA Finance',
      college: 'IIM Bangalore',
      image: '',
      rating: 5,
      review: 'Professional guidance and excellent support. EduConsult helped me secure admission in my dream college with scholarship.',
      year: '2023'
    },
    {
      id: 4,
      name: 'Vikram Kumar',
      course: 'B.Tech Mechanical',
      college: 'NIT Trichy',
      image: '',
      rating: 4,
      review: 'Great experience with EduConsult. They provided clear guidance and helped me choose the right college for my career.',
      year: '2023'
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      course: 'BDS',
      college: 'Manipal University',
      image: '',
      rating: 5,
      review: 'Excellent service and genuine guidance. EduConsult team is very professional and trustworthy.',
      year: '2024'
    }
  ];

  // Current carousel slide
  currentSlide = 0;

  // Current review index for auto-scroll
  currentReviewIndex = 0;

  // Intervals for auto-scroll
  private carouselInterval: any;
  private reviewInterval: any;

  constructor() { }

  ngOnInit() {
    this.startCarouselAutoScroll();
    this.startReviewAutoScroll();
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
  startReviewAutoScroll() {
    this.reviewInterval = setInterval(() => {
      this.currentReviewIndex = (this.currentReviewIndex + 1) % this.studentReviews.length;
    }, 4000); // Change review every 4 seconds
  }

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

}
