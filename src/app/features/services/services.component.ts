import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services = [
    {
      id: 1,
      title: 'Direct Admission',
      icon: 'school',
      description: 'Skip entrance exams with guaranteed admission to top colleges',
      features: [
        'No entrance exam required',
        'Guaranteed seat confirmation',
        'Top-tier college partnerships',
        'Quick admission process'
      ],
      color: 'green',
      popular: true
    },
    {
      id: 2,
      title: 'Career Counseling',
      icon: 'psychology',
      description: 'Expert guidance to choose the right career path',
      features: [
        'One-on-one counseling sessions',
        'Aptitude and interest assessment',
        'Industry trend insights',
        'Personalized career roadmap'
      ],
      color: 'blue',
      popular: false
    },
    {
      id: 3,
      title: 'Scholarship Assistance',
      icon: 'monetization_on',
      description: 'Financial aid and scholarship guidance',
      features: [
        'Merit-based scholarships',
        'Financial aid guidance',
        'Education loan assistance',
        'Fee structure optimization'
      ],
      color: 'purple',
      popular: false
    },
    {
      id: 4,
      title: 'Document Verification',
      icon: 'verified',
      description: 'Complete document processing and verification',
      features: [
        'Document authentication',
        'Application form filling',
        'Eligibility verification',
        'Submission assistance'
      ],
      color: 'orange',
      popular: false
    },
    {
      id: 5,
      title: 'Entrance Exam Prep',
      icon: 'quiz',
      description: 'Comprehensive preparation for entrance exams',
      features: [
        'Expert faculty guidance',
        'Mock tests and practice',
        'Study material provision',
        'Performance analysis'
      ],
      color: 'red',
      popular: true
    },
    {
      id: 6,
      title: 'Visa & Immigration',
      icon: 'flight_takeoff',
      description: 'Complete support for international education',
      features: [
        'Visa application assistance',
        'University selection abroad',
        'Documentation support',
        'Pre-departure guidance'
      ],
      color: 'indigo',
      popular: false
    }
  ];

  testimonials = [
    {
      name: 'Rahul Sharma',
      course: 'B.Tech Computer Science',
      college: 'IIT Delhi',
      rating: 5,
      comment: 'WAYZON helped me get direct admission to IIT Delhi. Their guidance was exceptional!'
    },
    {
      name: 'Priya Patel',
      course: 'MBBS',
      college: 'AIIMS Mumbai',
      rating: 5,
      comment: 'The career counseling service helped me choose the right medical college. Highly recommended!'
    },
    {
      name: 'Amit Kumar',
      course: 'MBA',
      college: 'IIM Bangalore',
      rating: 5,
      comment: 'Got scholarship assistance that reduced my MBA fees by 40%. Thank you WAYZON!'
    }
  ];

  ngOnInit(): void {
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: string } = {
      green: 'from-green-500 to-emerald-600',
      blue: 'from-blue-500 to-indigo-600',
      purple: 'from-purple-500 to-pink-600',
      orange: 'from-orange-500 to-red-500',
      red: 'from-red-500 to-pink-600',
      indigo: 'from-indigo-500 to-purple-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }
}
