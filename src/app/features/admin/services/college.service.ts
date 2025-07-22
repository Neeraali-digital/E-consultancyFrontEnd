import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { College } from '../pages/colleges/college-list/college-list.component';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private colleges: College[] = [
    {
      id: '1',
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi, Delhi',
      type: 'engineering',
      established: 1961,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      rating: 4.8,
      fees: { min: 200000, max: 300000 },
      status: 'active',
      description: 'Premier engineering institute known for excellence in technology and research.',
      website: 'https://www.iitd.ac.in',
      email: 'info@iitd.ac.in',
      phone: '9876543210'
    },
    {
      id: '2',
      name: 'All India Institute of Medical Sciences',
      location: 'New Delhi, Delhi',
      type: 'medical',
      established: 1956,
      courses: ['MBBS', 'MD', 'MS', 'PhD'],
      rating: 4.9,
      fees: { min: 50000, max: 100000 },
      status: 'active',
      description: 'Leading medical institute providing quality healthcare education.',
      website: 'https://www.aiims.edu',
      email: 'info@aiims.edu',
      phone: '9876543211'
    },
    {
      id: '3',
      name: 'Indian Institute of Management Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      type: 'management',
      established: 1961,
      courses: ['MBA', 'PGDM', 'PhD'],
      rating: 4.7,
      fees: { min: 2500000, max: 2800000 },
      status: 'active',
      description: 'Top business school offering world-class management education.',
      website: 'https://www.iima.ac.in',
      email: 'info@iima.ac.in',
      phone: '9876543212'
    },
    {
      id: '4',
      name: 'Delhi University',
      location: 'New Delhi, Delhi',
      type: 'arts',
      established: 1922,
      courses: ['B.A', 'M.A', 'B.Sc', 'M.Sc', 'B.Com', 'M.Com'],
      rating: 4.5,
      fees: { min: 15000, max: 50000 },
      status: 'active',
      description: 'One of the largest universities in India offering diverse academic programs.',
      website: 'https://www.du.ac.in',
      email: 'info@du.ac.in',
      phone: '9876543213'
    },
    {
      id: '5',
      name: 'National Law School of India University',
      location: 'Bangalore, Karnataka',
      type: 'law',
      established: 1987,
      courses: ['LLB', 'LLM', 'PhD'],
      rating: 4.6,
      fees: { min: 150000, max: 200000 },
      status: 'active',
      description: 'Premier law school known for academic excellence and legal research.',
      website: 'https://www.nls.ac.in',
      email: 'info@nls.ac.in',
      phone: '9876543214'
    },
    {
      id: '6',
      name: 'Jamia Hamdard University',
      location: 'New Delhi, Delhi',
      type: 'pharmacy',
      established: 1989,
      courses: ['B.Pharm', 'M.Pharm', 'PhD'],
      rating: 4.3,
      fees: { min: 80000, max: 120000 },
      status: 'inactive',
      description: 'Leading pharmacy college with focus on pharmaceutical sciences.',
      website: 'https://www.jamiahamdard.edu',
      email: 'info@jamiahamdard.edu',
      phone: '9876543215'
    }
  ];

  constructor() {}

  getColleges(): Observable<College[]> {
    return of([...this.colleges]).pipe(delay(500));
  }

  getCollege(id: string): Observable<College> {
    const college = this.colleges.find(c => c.id === id);
    if (college) {
      return of({ ...college }).pipe(delay(300));
    } else {
      return throwError(() => new Error('College not found'));
    }
  }

  createCollege(collegeData: Partial<College>): Observable<College> {
    const newCollege: College = {
      id: this.generateId(),
      name: collegeData.name || '',
      location: collegeData.location || '',
      type: collegeData.type || '',
      established: collegeData.established || new Date().getFullYear(),
      courses: collegeData.courses || [],
      rating: collegeData.rating || 0,
      fees: collegeData.fees || { min: 0, max: 0 },
      status: collegeData.status || 'active',
      description: collegeData.description,
      website: collegeData.website,
      email: collegeData.email,
      phone: collegeData.phone,
      image: collegeData.image
    };

    this.colleges.push(newCollege);
    return of({ ...newCollege }).pipe(delay(800));
  }

  updateCollege(id: string, collegeData: Partial<College>): Observable<College> {
    const index = this.colleges.findIndex(c => c.id === id);
    if (index !== -1) {
      this.colleges[index] = { ...this.colleges[index], ...collegeData };
      return of({ ...this.colleges[index] }).pipe(delay(800));
    } else {
      return throwError(() => new Error('College not found'));
    }
  }

  deleteCollege(id: string): Observable<boolean> {
    const index = this.colleges.findIndex(c => c.id === id);
    if (index !== -1) {
      this.colleges.splice(index, 1);
      return of(true).pipe(delay(500));
    } else {
      return throwError(() => new Error('College not found'));
    }
  }

  searchColleges(query: string): Observable<College[]> {
    const filteredColleges = this.colleges.filter(college =>
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.location.toLowerCase().includes(query.toLowerCase()) ||
      college.type.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredColleges).pipe(delay(300));
  }

  getCollegesByType(type: string): Observable<College[]> {
    const filteredColleges = this.colleges.filter(college => college.type === type);
    return of(filteredColleges).pipe(delay(300));
  }

  getCollegesByStatus(status: 'active' | 'inactive'): Observable<College[]> {
    const filteredColleges = this.colleges.filter(college => college.status === status);
    return of(filteredColleges).pipe(delay(300));
  }

  getCollegeStats(): Observable<{
    total: number;
    active: number;
    inactive: number;
    byType: { [key: string]: number };
  }> {
    const stats = {
      total: this.colleges.length,
      active: this.colleges.filter(c => c.status === 'active').length,
      inactive: this.colleges.filter(c => c.status === 'inactive').length,
      byType: this.colleges.reduce((acc, college) => {
        acc[college.type] = (acc[college.type] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    };

    return of(stats).pipe(delay(200));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Bulk operations
  bulkUpdateStatus(ids: string[], status: 'active' | 'inactive'): Observable<boolean> {
    ids.forEach(id => {
      const index = this.colleges.findIndex(c => c.id === id);
      if (index !== -1) {
        this.colleges[index].status = status;
      }
    });
    return of(true).pipe(delay(1000));
  }

  bulkDelete(ids: string[]): Observable<boolean> {
    ids.forEach(id => {
      const index = this.colleges.findIndex(c => c.id === id);
      if (index !== -1) {
        this.colleges.splice(index, 1);
      }
    });
    return of(true).pipe(delay(1000));
  }

  // Import/Export functionality
  exportColleges(): Observable<College[]> {
    return of([...this.colleges]).pipe(delay(500));
  }

  importColleges(colleges: College[]): Observable<boolean> {
    // In a real application, you would validate and merge the data
    colleges.forEach(college => {
      if (!this.colleges.find(c => c.id === college.id)) {
        this.colleges.push({ ...college });
      }
    });
    return of(true).pipe(delay(1000));
  }
}
