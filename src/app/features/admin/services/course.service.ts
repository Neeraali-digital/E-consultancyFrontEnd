import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  duration: string;
  degreeType: string;
  description: string;
  eligibility: string;
  annualFee: number;
  totalFee: number;
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
      degreeType: 'undergraduate',
      description: 'A comprehensive program covering computer science fundamentals, programming, algorithms, and software development.',
      eligibility: '10+2 with Physics, Chemistry, Mathematics with minimum 60% marks',
      annualFee: 150000,
      totalFee: 600000,
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
      degreeType: 'postgraduate',
      description: 'Advanced business management program focusing on leadership, strategy, and entrepreneurship.',
      eligibility: 'Bachelor\'s degree with minimum 50% marks and valid entrance exam score',
      annualFee: 200000,
      totalFee: 400000,
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
      degreeType: 'undergraduate',
      description: 'Comprehensive medical education program preparing students for medical practice.',
      eligibility: '10+2 with Physics, Chemistry, Biology with minimum 70% marks and NEET qualification',
      annualFee: 500000,
      totalFee: 2750000,
      status: 'active',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(this.courses).pipe(delay(500));
  }

  getCourse(id: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course).pipe(delay(300));
  }

  createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Observable<Course> {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.courses.push(newCourse);
    return of(newCourse).pipe(delay(1000));
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses[index] = {
        ...this.courses[index],
        ...course,
        updatedAt: new Date()
      };
      return of(this.courses[index]).pipe(delay(1000));
    }
    throw new Error('Course not found');
  }

  deleteCourse(id: string): Observable<boolean> {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  toggleCourseStatus(id: string): Observable<Course> {
    const course = this.courses.find(c => c.id === id);
    if (course) {
      course.status = course.status === 'active' ? 'inactive' : 'active';
      course.updatedAt = new Date();
      return of(course).pipe(delay(500));
    }
    throw new Error('Course not found');
  }
}
