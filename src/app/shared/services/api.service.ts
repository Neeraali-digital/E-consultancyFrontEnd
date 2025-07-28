import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenSubject.value;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  // Generic HTTP methods
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  // Authentication APIs
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.post('/auth/login/', credentials);
  }

  register(userData: any): Observable<any> {
    return this.post('/auth/register/', userData);
  }

  logout(): Observable<any> {
    return this.post('/auth/logout/', {});
  }

  // Users APIs
  getUsers(params?: any): Observable<any> {
    return this.get('/users/', params);
  }

  getUser(id: number): Observable<any> {
    return this.get(`/users/${id}/`);
  }

  createUser(userData: any): Observable<any> {
    return this.post('/users/', userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.put(`/users/${id}/`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete(`/users/${id}/`);
  }

  // Students APIs
  getStudents(params?: any): Observable<any> {
    return this.get('/students/', params);
  }

  getStudent(id: number): Observable<any> {
    return this.get(`/students/${id}/`);
  }

  createStudent(studentData: any): Observable<any> {
    return this.post('/students/', studentData);
  }

  updateStudent(id: number, studentData: any): Observable<any> {
    return this.put(`/students/${id}/`, studentData);
  }

  getStudentStats(): Observable<any> {
    return this.get('/students/stats/');
  }

  // Colleges APIs
  getColleges(params?: any): Observable<any> {
    return this.get('/colleges/', params);
  }

  getCollege(id: number): Observable<any> {
    return this.get(`/colleges/${id}/`);
  }

  createCollege(collegeData: any): Observable<any> {
    return this.post('/colleges/', collegeData);
  }

  updateCollege(id: number, collegeData: any): Observable<any> {
    return this.put(`/colleges/${id}/`, collegeData);
  }

  deleteCollege(id: number): Observable<any> {
    return this.delete(`/colleges/${id}/`);
  }

  getCollegeStats(): Observable<any> {
    return this.get('/colleges/stats/');
  }

  // Courses APIs
  getCourses(params?: any): Observable<any> {
    return this.get('/courses/', params);
  }

  getCourse(id: number): Observable<any> {
    return this.get(`/courses/${id}/`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.post('/courses/', courseData);
  }

  updateCourse(id: number, courseData: any): Observable<any> {
    return this.put(`/courses/${id}/`, courseData);
  }

  deleteCourse(id: number): Observable<any> {
    return this.delete(`/courses/${id}/`);
  }

  toggleCourseStatus(id: number): Observable<any> {
    return this.post(`/courses/${id}/toggle-status/`, {});
  }

  getCourseStats(): Observable<any> {
    return this.get('/courses/stats/');
  }

  // Applications APIs
  getApplications(params?: any): Observable<any> {
    return this.get('/applications/', params);
  }

  getApplication(id: number): Observable<any> {
    return this.get(`/applications/${id}/`);
  }

  createApplication(applicationData: any): Observable<any> {
    return this.post('/applications/', applicationData);
  }

  updateApplication(id: number, applicationData: any): Observable<any> {
    return this.put(`/applications/${id}/`, applicationData);
  }

  // Payments APIs
  getPayments(params?: any): Observable<any> {
    return this.get('/payments/', params);
  }

  getPayment(id: number): Observable<any> {
    return this.get(`/payments/${id}/`);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.post('/payments/', paymentData);
  }

  // Blogs APIs
  getBlogs(params?: any): Observable<any> {
    return this.get('/blogs/', params);
  }

  getBlog(id: number): Observable<any> {
    return this.get(`/blogs/${id}/`);
  }

  createBlog(blogData: any): Observable<any> {
    return this.post('/blogs/', blogData);
  }

  updateBlog(id: number, blogData: any): Observable<any> {
    return this.put(`/blogs/${id}/`, blogData);
  }

  deleteBlog(id: number): Observable<any> {
    return this.delete(`/blogs/${id}/`);
  }

  // Reviews APIs
  getReviews(params?: any): Observable<any> {
    return this.get('/reviews/', params);
  }

  getReview(id: number): Observable<any> {
    return this.get(`/reviews/${id}/`);
  }

  createReview(reviewData: any): Observable<any> {
    return this.post('/reviews/', reviewData);
  }

  updateReview(id: number, reviewData: any): Observable<any> {
    return this.put(`/reviews/${id}/`, reviewData);
  }

  deleteReview(id: number): Observable<any> {
    return this.delete(`/reviews/${id}/`);
  }

  // Dashboard APIs
  getDashboardStats(): Observable<any> {
    return this.get('/dashboard/stats/');
  }

  // Search API
  search(query: string, type?: string): Observable<any> {
    const params = { q: query, ...(type && { type }) };
    return this.get('/search/', params);
  }
}