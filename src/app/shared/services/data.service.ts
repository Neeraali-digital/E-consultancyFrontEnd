import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private collegesSubject = new BehaviorSubject<any[]>([]);
  private coursesSubject = new BehaviorSubject<any[]>([]);
  private blogsSubject = new BehaviorSubject<any[]>([]);
  private studentsSubject = new BehaviorSubject<any[]>([]);
  private applicationsSubject = new BehaviorSubject<any[]>([]);

  public colleges$ = this.collegesSubject.asObservable();
  public courses$ = this.coursesSubject.asObservable();
  public blogs$ = this.blogsSubject.asObservable();
  public students$ = this.studentsSubject.asObservable();
  public applications$ = this.applicationsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.initializeData();
  }

  private initializeData(): void {
    this.loadAllData().subscribe();
  }

  loadAllData(): Observable<any> {
    return forkJoin({
      colleges: this.apiService.getColleges(),
      courses: this.apiService.getCourses(),
      blogs: this.apiService.getBlogs(),
      students: this.apiService.getStudents(),
      applications: this.apiService.getApplications()
    }).pipe(
      tap(data => {
        this.collegesSubject.next(data.colleges.results || data.colleges || []);
        this.coursesSubject.next(data.courses.results || data.courses || []);
        this.blogsSubject.next(data.blogs.results || data.blogs || []);
        this.studentsSubject.next(data.students.results || data.students || []);
        this.applicationsSubject.next(data.applications.results || data.applications || []);
      })
    );
  }

  // Colleges
  getColleges(): Observable<any[]> {
    return this.colleges$;
  }

  addCollege(college: any): Observable<any> {
    return this.apiService.createCollege(college).pipe(
      tap(newCollege => {
        const current = this.collegesSubject.value;
        this.collegesSubject.next([...current, newCollege]);
      })
    );
  }

  updateCollege(id: number, college: any): Observable<any> {
    return this.apiService.updateCollege(id, college).pipe(
      tap(updatedCollege => {
        const current = this.collegesSubject.value;
        const index = current.findIndex(c => c.id === id);
        if (index !== -1) {
          current[index] = updatedCollege;
          this.collegesSubject.next([...current]);
        }
      })
    );
  }

  deleteCollege(id: number): Observable<any> {
    return this.apiService.deleteCollege(id).pipe(
      tap(() => {
        const current = this.collegesSubject.value;
        this.collegesSubject.next(current.filter(c => c.id !== id));
      })
    );
  }

  // Courses
  getCourses(): Observable<any[]> {
    return this.courses$;
  }

  addCourse(course: any): Observable<any> {
    return this.apiService.createCourse(course).pipe(
      tap(newCourse => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next([...current, newCourse]);
      })
    );
  }

  updateCourse(id: number, course: any): Observable<any> {
    return this.apiService.updateCourse(id, course).pipe(
      tap(updatedCourse => {
        const current = this.coursesSubject.value;
        const index = current.findIndex(c => c.id === id);
        if (index !== -1) {
          current[index] = updatedCourse;
          this.coursesSubject.next([...current]);
        }
      })
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.apiService.deleteCourse(id).pipe(
      tap(() => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next(current.filter(c => c.id !== id));
      })
    );
  }

  // Blogs
  getBlogs(): Observable<any[]> {
    return this.blogs$;
  }

  addBlog(blog: any): Observable<any> {
    return this.apiService.createBlog(blog).pipe(
      tap(newBlog => {
        const current = this.blogsSubject.value;
        this.blogsSubject.next([...current, newBlog]);
      })
    );
  }

  updateBlog(id: number, blog: any): Observable<any> {
    return this.apiService.updateBlog(id, blog).pipe(
      tap(updatedBlog => {
        const current = this.blogsSubject.value;
        const index = current.findIndex(b => b.id === id);
        if (index !== -1) {
          current[index] = updatedBlog;
          this.blogsSubject.next([...current]);
        }
      })
    );
  }

  deleteBlog(id: number): Observable<any> {
    return this.apiService.deleteBlog(id).pipe(
      tap(() => {
        const current = this.blogsSubject.value;
        this.blogsSubject.next(current.filter(b => b.id !== id));
      })
    );
  }

  // Students
  getStudents(): Observable<any[]> {
    return this.students$;
  }

  addStudent(student: any): Observable<any> {
    return this.apiService.createStudent(student).pipe(
      tap(newStudent => {
        const current = this.studentsSubject.value;
        this.studentsSubject.next([...current, newStudent]);
      })
    );
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.apiService.updateStudent(id, student).pipe(
      tap(updatedStudent => {
        const current = this.studentsSubject.value;
        const index = current.findIndex(s => s.id === id);
        if (index !== -1) {
          current[index] = updatedStudent;
          this.studentsSubject.next([...current]);
        }
      })
    );
  }

  // Applications
  getApplications(): Observable<any[]> {
    return this.applications$;
  }

  addApplication(application: any): Observable<any> {
    return this.apiService.createApplication(application).pipe(
      tap(newApplication => {
        const current = this.applicationsSubject.value;
        this.applicationsSubject.next([...current, newApplication]);
      })
    );
  }

  updateApplication(id: number, application: any): Observable<any> {
    return this.apiService.updateApplication(id, application).pipe(
      tap(updatedApplication => {
        const current = this.applicationsSubject.value;
        const index = current.findIndex(a => a.id === id);
        if (index !== -1) {
          current[index] = updatedApplication;
          this.applicationsSubject.next([...current]);
        }
      })
    );
  }

  // Search functionality
  searchAll(query: string): Observable<any> {
    return this.apiService.search(query);
  }

  // Dashboard stats
  getDashboardStats(): Observable<any> {
    return this.apiService.getDashboardStats();
  }

  // Refresh data
  refreshData(): Observable<any> {
    return this.loadAllData();
  }
}