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
    { year: 2003, title: 'Foundation', description: 'Our Journey Started.' },
    { year: 2004, title: 'Partnerships', description: '20 top institutional partnerships in Karnataka' },
    { year: 2005, title: 'First Success', description: 'Successfully admitted 500 happy candidates.' },
    { year: 2006, title: 'ISO Certification', description: 'South India\'s first ISO-certified education consultancy.' },
    { year: 2007, title: 'Medical Leadership', description: 'Become the leading PG medical education consultants in Bangalore.' },
    { year: 2008, title: 'Recognition', description: 'Awarded Best Education Consultancy in Karnataka.' },
    { year: 2009, title: 'National Expansion', description: 'Achieved the milestone of opening 10 offices across the country.' },
    { year: 2010, title: 'Headquarters', description: 'Our headquarters opened at MG Road, the central hub of Bangalore.' },
    { year: 2011, title: 'Direct MOUs', description: 'Signed direct MOUs with 50 institutions.' },
    { year: 2012, title: 'Northeast Expansion', description: 'We opened our first office in Northeast India, located in Agartala.' },
    { year: 2013, title: '10th Anniversary', description: 'In our 10th anniversary year, we fully sponsored the course fees of 10 needy students.' },
    { year: 2014, title: 'Major Milestone', description: 'Successfully achieved the milestone of 5,000 admissions.' },
    { year: 2015, title: 'Excellence Award', description: 'Education Excellence Award Winner' },
    { year: 2016, title: 'Education Fair', description: 'Our collaboration with the biggest education fair in Northeast India has begun.' },
    { year: 2017, title: 'Regional Leadership', description: 'Become South India\'s leading education consultancy.' },
    { year: 2018, title: 'Team Growth', description: 'A team of 200+ in-house staff and more than 1,000 associates.' },
    { year: 2019, title: 'Global Presence', description: 'Successfully set up 20 offices across India and abroad.' },
    { year: 2020, title: 'National Leadership', description: 'Became India\'s leading education consultancy for domestic admissions.' },
    { year: 2021, title: 'Corporate Structure', description: 'Incorporated as a Private Limited Company.' },
    { year: 2022, title: 'Industry Leadership', description: 'Our MD became the Founder and National President of the Education Consultants Association of India (ECAI).' },
    { year: 2023, title: 'Excellence Milestone', description: 'Achieved the milestone of 10,000 successful admissions.' },
    { year: 2024, title: 'International Programs', description: 'Launched MBBS abroad program.' }
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
