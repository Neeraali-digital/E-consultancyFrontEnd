import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationMessage } from '../components/notification-sheet/notification-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: NotificationMessage[] = [];
  private notificationsSubject = new BehaviorSubject<NotificationMessage[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadNotifications();
    this.addWelcomeMessageOnPageLoad();
  }

  getNotifications(): Observable<NotificationMessage[]> {
    return this.notificationsSubject.asObservable();
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  private loadNotifications(): void {
    const stored = localStorage.getItem('wayzon_notifications');
    if (stored) {
      this.notifications = JSON.parse(stored);
      this.updateSubjects();
    }
  }

  private saveNotifications(): void {
    localStorage.setItem('wayzon_notifications', JSON.stringify(this.notifications));
    this.updateSubjects();
  }

  private updateSubjects(): void {
    this.notificationsSubject.next([...this.notifications]);
    this.unreadCountSubject.next(this.notifications.filter(n => !n.read).length);
  }

  private addWelcomeMessageOnPageLoad(): void {
    // Check if welcome message was already shown today
    const lastWelcome = localStorage.getItem('wayzon_last_welcome');
    const today = new Date().toDateString();
    
    if (lastWelcome !== today) {
      // Add welcome message
      const welcomeMessage: NotificationMessage = {
        id: 'welcome-' + Date.now(),
        title: 'Welcome to Wayzon! 🎓',
        message: 'Welcome! Want help to find college and course?',
        type: 'welcome',
        timestamp: new Date(),
        read: false,
        actions: [
          {
            label: 'Colleges',
            route: '/colleges',
            icon: 'account_balance',
            color: 'blue'
          },
          {
            label: 'Courses',
            route: '/courses',
            icon: 'school',
            color: 'purple'
          }
        ]
      };
      
      this.addNotification(welcomeMessage);
      localStorage.setItem('wayzon_last_welcome', today);
    }
  }

  addNotification(notification: Omit<NotificationMessage, 'id' | 'timestamp'>): void {
    const newNotification: NotificationMessage = {
      ...notification,
      id: 'notif-' + Date.now(),
      timestamp: new Date()
    };
    
    this.notifications.unshift(newNotification);
    this.saveNotifications();
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  removeNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveNotifications();
  }

  clearAllNotifications(): void {
    this.notifications = [];
    this.saveNotifications();
  }

  // Predefined notification templates
  addCourseUpdateNotification(courseName: string): void {
    this.addNotification({
      title: 'Course Update Available',
      message: `New information available for ${courseName}. Check it out!`,
      type: 'info',
      read: false,
      actions: [
        {
          label: 'View Course',
          route: '/courses',
          icon: 'school',
          color: 'blue'
        }
      ]
    });
  }

  addAdmissionDeadlineNotification(collegeName: string, deadline: string): void {
    this.addNotification({
      title: 'Admission Deadline Reminder',
      message: `Admission deadline for ${collegeName} is approaching on ${deadline}`,
      type: 'warning',
      read: false,
      actions: [
        {
          label: 'Apply Now',
          route: '/contact',
          icon: 'send',
          color: 'orange'
        }
      ]
    });
  }

  addSuccessNotification(title: string, message: string): void {
    this.addNotification({
      title,
      message,
      type: 'success',
      read: false
    });
  }

  getCurrentUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
