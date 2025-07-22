import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Blog[] = [
    {
      id: '1',
      title: 'Top Engineering Colleges in India 2024',
      slug: 'top-engineering-colleges-india-2024',
      excerpt: 'Discover the best engineering colleges in India for 2024, including IITs, NITs, and other premier institutions.',
      content: 'Full content here...',
      author: 'Dr. Rajesh Kumar',
      category: 'education',
      tags: ['engineering', 'colleges', 'india', 'admission'],
      featuredImage: '/assets/images/engineering-colleges.jpg',
      status: 'published',
      publishedAt: new Date('2024-01-15'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15'),
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      title: 'Career Opportunities in Data Science',
      slug: 'career-opportunities-data-science',
      excerpt: 'Explore the growing field of data science and the various career paths available for aspiring data scientists.',
      content: 'Full content here...',
      author: 'Priya Sharma',
      category: 'career',
      tags: ['data-science', 'career', 'technology', 'jobs'],
      featuredImage: '/assets/images/data-science-career.jpg',
      status: 'published',
      publishedAt: new Date('2024-01-12'),
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-12'),
      views: 890,
      likes: 67
    },
    {
      id: '3',
      title: 'NEET 2024: Preparation Tips and Strategies',
      slug: 'neet-2024-preparation-tips',
      excerpt: 'Essential tips and strategies to crack NEET 2024 and secure admission in top medical colleges.',
      content: 'Full content here...',
      author: 'Dr. Anita Verma',
      category: 'admission',
      tags: ['neet', 'medical', 'preparation', 'tips'],
      featuredImage: '/assets/images/neet-preparation.jpg',
      status: 'draft',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      views: 0,
      likes: 0
    }
  ];

  constructor() { }

  getBlogs(): Observable<Blog[]> {
    return of(this.blogs).pipe(delay(500));
  }

  getBlog(id: string): Observable<Blog | undefined> {
    const blog = this.blogs.find(b => b.id === id);
    return of(blog).pipe(delay(300));
  }

  createBlog(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): Observable<Blog> {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0
    };
    
    this.blogs.push(newBlog);
    return of(newBlog).pipe(delay(1000));
  }

  updateBlog(id: string, blog: Partial<Blog>): Observable<Blog> {
    const index = this.blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      this.blogs[index] = {
        ...this.blogs[index],
        ...blog,
        updatedAt: new Date()
      };
      return of(this.blogs[index]).pipe(delay(1000));
    }
    throw new Error('Blog not found');
  }

  deleteBlog(id: string): Observable<boolean> {
    const index = this.blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      this.blogs.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  toggleBlogStatus(id: string): Observable<Blog> {
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      if (blog.status === 'published') {
        blog.status = 'draft';
      } else {
        blog.status = 'published';
        blog.publishedAt = new Date();
      }
      blog.updatedAt = new Date();
      return of(blog).pipe(delay(500));
    }
    throw new Error('Blog not found');
  }

  incrementViews(id: string): Observable<Blog> {
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      blog.views++;
      return of(blog).pipe(delay(100));
    }
    throw new Error('Blog not found');
  }

  toggleLike(id: string): Observable<Blog> {
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      blog.likes++;
      return of(blog).pipe(delay(200));
    }
    throw new Error('Blog not found');
  }
}
