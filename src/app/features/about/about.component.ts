import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAnimationDirective } from '../../shared/directives/counter-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CounterAnimationDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  stats = [
    { number: '20+', label: 'Years of Excellence', icon: 'star' },
    { number: '10,000+', label: 'Students Placed', icon: 'people' },
    { number: '500+', label: 'Partner Colleges', icon: 'school' },
    { number: '95%', label: 'Success Rate', icon: 'trending_up' }
  ];

  whatWeDoServices = [
    {
      title: 'CAREER COUNSELING',
      icon: 'psychology',
      bgColor: 'bg-blue-600',
      description: 'Expert guidance to help you discover your true potential and choose the right career path that aligns with your interests and abilities.',
      features: [
        'Personality & Aptitude Assessment',
        'Career Mapping & Planning',
        'Industry Insights & Trends',
        'One-on-One Counseling Sessions'
      ]
    },
    {
      title: 'ADMISSION GUIDANCE',
      icon: 'school',
      bgColor: 'bg-green-600',
      description: 'Comprehensive support throughout the admission process to secure your place in top educational institutions.',
      features: [
        'College Selection & Shortlisting',
        'Application Process Support',
        'Document Preparation',
        'Interview Preparation'
      ]
    },
    {
      title: 'LOCAL GUARDIAN SERVICE',
      icon: 'family_restroom',
      bgColor: 'bg-purple-600',
      description: 'Reliable local guardian services ensuring your safety and well-being while studying away from home.',
      features: [
        '24/7 Emergency Support',
        'Regular Progress Monitoring',
        'Parent Communication',
        'Local Assistance & Guidance'
      ]
    },
    {
      title: 'CAMPUS VISIT',
      icon: 'tour',
      bgColor: 'bg-orange-600',
      description: 'Organized campus visits to help you experience the college environment and make informed decisions.',
      features: [
        'Guided Campus Tours',
        'Faculty Interactions',
        'Student Life Experience',
        'Facility Demonstrations'
      ]
    },
    {
      title: 'EDUCATION LOANS',
      icon: 'account_balance',
      bgColor: 'bg-red-600',
      description: 'Assistance with education loan applications and financial planning to make quality education affordable.',
      features: [
        'Loan Application Support',
        'Bank Liaison Services',
        'Documentation Assistance',
        'Financial Planning Guidance'
      ]
    }
  ];

  team = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Founder & CEO',
      experience: '25+ years',
      specialization: 'Educational Leadership',
      image: 'team-1.jpg',
      description: 'Visionary leader with extensive experience in educational consulting'
    },
    {
      name: 'Ms. Priya Sharma',
      position: 'Head of Admissions',
      experience: '15+ years',
      specialization: 'College Admissions',
      image: 'team-2.jpg',
      description: 'Expert in college admissions and student counseling'
    },
    {
      name: 'Mr. Amit Patel',
      position: 'Career Counselor',
      experience: '12+ years',
      specialization: 'Career Guidance',
      image: 'team-3.jpg',
      description: 'Specialized in career counseling and aptitude assessment'
    },
    {
      name: 'Dr. Sunita Reddy',
      position: 'Academic Director',
      experience: '18+ years',
      specialization: 'Academic Planning',
      image: 'team-4.jpg',
      description: 'Expert in academic planning and curriculum development'
    }
  ];

  milestones = [
    { year: 2003, title: 'Foundation', description: 'WAYZON Educational Consultancy established' },
    { year: 2008, title: 'Expansion', description: 'Opened branches in 5 major cities' },
    { year: 2012, title: 'Recognition', description: 'Awarded "Best Educational Consultancy"' },
    { year: 2015, title: 'Digital Transformation', description: 'Launched online counseling platform' },
    { year: 2018, title: 'International Reach', description: 'Started international education services' },
    { year: 2020, title: 'Innovation', description: 'Introduced AI-powered career guidance' },
    { year: 2023, title: 'Excellence', description: 'Achieved 10,000+ successful placements' }
  ];

  values = [
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency',
      icon: 'verified'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do',
      icon: 'star'
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and methodologies',
      icon: 'lightbulb'
    },
    {
      title: 'Student-Centric',
      description: 'Every decision is made with student success in mind',
      icon: 'favorite'
    }
  ];

  ngOnInit(): void {
  }
}
