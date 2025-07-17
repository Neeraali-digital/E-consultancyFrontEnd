import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

  selectedCategory = 'all';
  
  categories = [
    { id: 'all', name: 'All Posts', icon: 'dynamic_feed' },
    { id: 'career-guidance', name: 'Career Guidance', icon: 'trending_up' },
    { id: 'study-abroad', name: 'Study Abroad', icon: 'public' },
    { id: 'exam-tips', name: 'Exam Tips', icon: 'quiz' },
    { id: 'college-life', name: 'College Life', icon: 'school' }
  ];

  blogs = [
    {
      id: 1,
      title: 'Complete Guide to NEET 2025 Preparation',
      excerpt: 'Master the art of NEET preparation with our comprehensive guide covering study strategies, time management, and expert tips.',
      content: 'NEET preparation requires a systematic approach and dedicated effort. This comprehensive guide will help you navigate through the complexities of medical entrance exam preparation...',
      category: 'exam-tips',
      author: 'Dr. Priya Sharma',
      authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100',
      date: '2025-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600',
      tags: ['NEET', 'Medical', 'Preparation', 'Strategy'],
      featured: true
    },
    {
      id: 2,
      title: 'Why Georgia is the Perfect Destination for Medical Studies',
      excerpt: 'Discover why thousands of Indian students choose Georgia for their medical education and what makes it an ideal study destination.',
      content: 'Georgia has emerged as one of the most popular destinations for Indian students pursuing medical education abroad...',
      category: 'study-abroad',
      author: 'Rajesh Kumar',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      date: '2025-01-12',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600',
      tags: ['Georgia', 'MBBS', 'Study Abroad', 'Medical'],
      featured: false
    },
    {
      id: 3,
      title: 'Engineering Career Paths: Beyond Traditional Roles',
      excerpt: 'Explore emerging career opportunities in engineering and how to position yourself for success in the evolving tech landscape.',
      content: 'The engineering landscape is rapidly evolving with new technologies and career opportunities emerging every day...',
      category: 'career-guidance',
      author: 'Anita Verma',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      date: '2025-01-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      tags: ['Engineering', 'Career', 'Technology', 'Future'],
      featured: true
    },
    {
      id: 4,
      title: 'Making the Most of Your College Years',
      excerpt: 'Essential tips for college students to maximize their academic experience and prepare for a successful career.',
      content: 'College years are transformative and offer numerous opportunities for personal and professional growth...',
      category: 'college-life',
      author: 'Vikram Singh',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      date: '2025-01-08',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
      tags: ['College', 'Student Life', 'Success', 'Tips'],
      featured: false
    },
    {
      id: 5,
      title: 'JEE Main Strategy: Last Month Preparation',
      excerpt: 'Effective strategies and tips for the final month of JEE Main preparation to maximize your score.',
      content: 'The last month before JEE Main is crucial for consolidating your preparation and fine-tuning your exam strategy...',
      category: 'exam-tips',
      author: 'Prof. Suresh Gupta',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      date: '2025-01-05',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
      tags: ['JEE', 'Engineering', 'Strategy', 'Preparation'],
      featured: false
    },
    {
      id: 6,
      title: 'Scholarship Opportunities for International Students',
      excerpt: 'Comprehensive guide to scholarships available for Indian students planning to study abroad.',
      content: 'Studying abroad can be expensive, but numerous scholarship opportunities can help reduce the financial burden...',
      category: 'study-abroad',
      author: 'Meera Patel',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      date: '2025-01-03',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
      tags: ['Scholarships', 'Study Abroad', 'Financial Aid', 'International'],
      featured: true
    }
  ];

  get filteredBlogs() {
    if (this.selectedCategory === 'all') {
      return this.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return this.blogs
      .filter(blog => blog.category === this.selectedCategory)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get featuredBlogs() {
    return this.blogs.filter(blog => blog.featured).slice(0, 3);
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

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'career-guidance': 'blue',
      'study-abroad': 'purple',
      'exam-tips': 'green',
      'college-life': 'orange'
    };
    return colors[category] || 'gray';
  }
}
