import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';

export interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degree_type: string;
  description: string;
  eligibility: string;
  annual_fee: number;
  total_fee: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      name: 'Bachelor of Technology in Computer Science',
      code: 'CSE101',
      category: 'engineering',
      duration: '4 Years',
      degree_type: 'undergraduate',
      description: 'A comprehensive program covering computer science fundamentals, programming, algorithms, and software development.',
      eligibility: '10+2 with Physics, Chemistry, Mathematics with minimum 60% marks',
      annual_fee: 150000,
      total_fee: 600000,
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Master of Business Administration',
      code: 'MBA101',
      category: 'management',
      duration: '2 Years',
      degree_type: 'postgraduate',
      description: 'Advanced business management program focusing on leadership, strategy, and entrepreneurship.',
      eligibility: 'Bachelor\'s degree with minimum 50% marks and valid entrance exam score',
      annual_fee: 200000,
      total_fee: 400000,
      status: 'active',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Bachelor of Medicine and Bachelor of Surgery',
      code: 'MBBS101',
      category: 'medical',
      duration: '5.5 Years',
      degree_type: 'undergraduate',
      description: 'Comprehensive medical education program preparing students for medical practice.',
      eligibility: '10+2 with Physics, Chemistry, Biology with minimum 70% marks and NEET qualification',
      annual_fee: 500000,
      total_fee: 2750000,
      status: 'active',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  constructor(private apiService: ApiService) { }

  getCourses(): Observable<Course[]> {
    return this.apiService.getCourses().pipe(
      map(response => response.results || response || this.courses)
    );
  }

  getCourse(id: string): Observable<Course | undefined> {
    return this.apiService.getCourse(parseInt(id)).pipe(
      map(response => response || this.courses.find(c => c.id === id))
    );
  }

  createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Observable<Course> {
    return this.apiService.createCourse(course);
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.apiService.updateCourse(parseInt(id), course);
  }

  deleteCourse(id: string): Observable<boolean> {
    return this.apiService.deleteCourse(parseInt(id)).pipe(
      map(() => true)
    );
  }

  toggleCourseStatus(id: string): Observable<Course> {
    return this.apiService.toggleCourseStatus(parseInt(id));
  }
}
