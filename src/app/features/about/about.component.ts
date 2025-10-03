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
      title: 'Admission Process',
      icon: 'psychology',
      bgColor: 'bg-blue-600',
      description: 'We arrange enrollment via legal quotas; private colleges only. An advance payment confirms commitment before final fee payment.',
      features: [
        'Access legal quotas (NRI/Management)',
        'Advance Payment for Withdrawal Reduction',
        'Partner with approved private colleges only',
        'Sign mutual agreement and cancellation policy',
        'Transparent and secure process',
        'Final enrollment upon remaining fee payment'
      ]
    },
    {
      title: 'Career Counselling',
      icon: 'school',
      bgColor: 'bg-green-600',
      description: 'We assess your goals, recommend courses/colleges, and align paths with your budget and ability. Job support included.',
      features: [
        'Assess interests/strengths for decisions',
        'Align with ability, budget, and goals',
        'Post-course job support via HR team',
        'Expert advice on course/stream selection',
        'Insights on career trends and prospects',
        'Goal-oriented planning for confidence'
      ]
    },
    {
      title: 'Direct Admission',
      icon: 'family_restroom',
      bgColor: 'bg-purple-600',
      description: 'We act as delegates for the institution. We handle documentation and deadlines efficiently with our college tie-ups.',
      features: [
        'Strong college network',
        'Simplified and hassle-free process',
        'Stress-free experience (planned or last-minute)',
        'Potential for lower fees via bulk tie-ups',
        'Efficient processing due to official tie-ups',
        'Handle documentation and deadlines accurately',
      ]
    },
    {
      title: 'Local Guardian Service',
      icon: 'tour',
      bgColor: 'bg-yellow-600',
      description: 'We offer reliable support and act as a trusted local contact for safety, health, and housing needs.',
      features: [
        'Trusted point of contact (Student/Parent/Inst.)',
        'Assist with housing and health needs',
        'Arrange travel pick-ups',
        'Ensure student safety and comfort',
        'Regular parent updates on request',
        '24/7 emergency helpline available'
      ]
    },
    {
      title: 'Education Loan Assistance',
      icon: 'account_balance',
      bgColor: 'bg-red-600',
      description: 'We provide full support for education loans, finding collateral-free options and ensuring the lowest interest rate.',
      features: [
        'Full loan support with eligible banks',
        'Guidance through documentation/application',
        'Access collateral-free options (via banking connections)',
        'Track application from start to finish',
        'Expertise improves approval chances',
        'Secure maximum loan at lowest interest rate',
      ]
    },
    {
      title: 'Right College,Course Selection',
      icon: 'verified',
      bgColor: 'bg-blue-600',
      description: 'We match you to the right college based on rankings, fees, and facilities. Courses align with goals and market demand.',
      features: [
        'Assess accreditations, rankings, reputation',
        'Evaluate faculty, facilities, and fees',
        'Discuss goals, preferences, and budget',
        'Course selection based on interests/goals',
        'Cross-verify course details and conduct research',
        'Ensure alignment with market demand/job prospects',
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
