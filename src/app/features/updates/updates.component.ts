import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent {

  selectedCategory = 'all';

  categories = [
    { id: 'all', name: 'All Updates', icon: 'dynamic_feed' },
    { id: 'admissions', name: 'Admissions', icon: 'school' },
    { id: 'exams', name: 'Exams', icon: 'quiz' },
    { id: 'abroad', name: 'Study Abroad', icon: 'public' },
    { id: 'scholarships', name: 'Scholarships', icon: 'card_giftcard' }
  ];

  updates = [
    {
      id: 1,
      title: 'NEET 2025 Registration Opens',
      summary: 'National Eligibility cum Entrance Test registration has started for medical aspirants.',
      content: 'The National Testing Agency (NTA) has announced the opening of NEET 2025 registration. Students aspiring for medical courses can now apply online. The last date for registration is March 15, 2025.',
      category: 'exams',
      date: '2025-01-15',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      urgent: true
    },
    {
      id: 2,
      title: 'New Medical Colleges in Georgia',
      summary: 'Three new medical universities have been approved for Indian students in Georgia.',
      content: 'The Georgian Ministry of Education has approved three new medical universities that will accept Indian students. These universities offer MBBS programs with English medium instruction.',
      category: 'abroad',
      date: '2025-01-12',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      urgent: false
    },
    {
      id: 3,
      title: 'Engineering Admission Guidelines 2025',
      summary: 'AICTE releases new guidelines for engineering admissions across India.',
      content: 'The All India Council for Technical Education has released comprehensive guidelines for engineering admissions for the academic year 2025-26.',
      category: 'admissions',
      date: '2025-01-10',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      urgent: false
    },
    {
      id: 4,
      title: 'Merit Scholarship Program Launched',
      summary: 'New scholarship program for meritorious students announced by the government.',
      content: 'The government has launched a new merit-based scholarship program offering financial assistance to deserving students pursuing higher education.',
      category: 'scholarships',
      date: '2025-01-08',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
      urgent: false
    },
    {
      id: 5,
      title: 'JEE Main 2025 Exam Dates',
      summary: 'Joint Entrance Examination Main dates announced for 2025.',
      content: 'The National Testing Agency has announced the examination dates for JEE Main 2025. The first session will be conducted in January 2025.',
      category: 'exams',
      date: '2025-01-05',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      urgent: true
    },
    {
      id: 6,
      title: 'Russia University Partnerships',
      summary: 'New partnerships established with top Russian universities for Indian students.',
      content: 'Wayzon has established new partnerships with leading Russian universities, offering direct admission opportunities for Indian students in various programs.',
      category: 'abroad',
      date: '2025-01-03',
      image: 'https://images.unsplash.com/photo-1520637736862-4d197d17c90a?w=400',
      urgent: false
    }
  ];

  get filteredUpdates() {
    if (this.selectedCategory === 'all') {
      return this.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return this.updates
      .filter(update => update.category === this.selectedCategory)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get urgentUpdates() {
    return this.updates.filter(update => update.urgent);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getTimeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
}
