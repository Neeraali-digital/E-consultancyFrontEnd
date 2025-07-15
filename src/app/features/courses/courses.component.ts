import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAnimationDirective } from '../../shared/directives/counter-animation.directive';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CounterAnimationDirective],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses = [
    {
      id: 1,
      title: 'Engineering',
      icon: 'engineering',
      description: 'Premier engineering programs with 100% placement guarantee',
      programs: ['B.Tech', 'M.Tech', 'Diploma'],
      colleges: ['IIT', 'NIT', 'Top Private Colleges'],
      duration: '4 Years',
      eligibility: '12th with PCM',
      fees: '₹2-15 Lakhs',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Medical',
      icon: 'medical_services',
      description: 'MBBS, BDS, and medical courses with guaranteed admission',
      programs: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
      colleges: ['AIIMS', 'JIPMER', 'Top Medical Colleges'],
      duration: '5.5 Years',
      eligibility: '12th with PCB',
      fees: '₹5-25 Lakhs',
      color: 'red'
    },
    {
      id: 3,
      title: 'Management',
      icon: 'business',
      description: 'MBA and management programs from IIMs and top business schools',
      programs: ['MBA', 'PGDM', 'Executive MBA'],
      colleges: ['IIM', 'ISB', 'Top B-Schools'],
      duration: '2 Years',
      eligibility: 'Graduation',
      fees: '₹8-30 Lakhs',
      color: 'green'
    },
    {
      id: 4,
      title: 'Technology',
      icon: 'computer',
      description: 'Computer Science and IT programs for the digital age',
      programs: ['BCA', 'MCA', 'B.Sc IT'],
      colleges: ['Top IT Colleges', 'Universities'],
      duration: '3-4 Years',
      eligibility: '12th with Maths',
      fees: '₹1-8 Lakhs',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Arts & Science',
      icon: 'science',
      description: 'Diverse programs in humanities, science, and liberal arts',
      programs: ['BA', 'BSc', 'MA', 'MSc'],
      colleges: ['Top Universities', 'Liberal Arts Colleges'],
      duration: '3-4 Years',
      eligibility: '12th in relevant stream',
      fees: '₹50K-5 Lakhs',
      color: 'indigo'
    },
    {
      id: 6,
      title: 'Commerce',
      icon: 'account_balance',
      description: 'Commerce and finance programs for business careers',
      programs: ['B.Com', 'M.Com', 'CA', 'CS'],
      colleges: ['Top Commerce Colleges', 'Universities'],
      duration: '3-4 Years',
      eligibility: '12th with Commerce',
      fees: '₹30K-3 Lakhs',
      color: 'orange'
    }
  ];

  ngOnInit(): void {
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }
}
