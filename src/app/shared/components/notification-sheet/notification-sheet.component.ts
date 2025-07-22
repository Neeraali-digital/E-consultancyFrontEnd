import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'info' | 'success' | 'warning';
  timestamp: Date;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  route: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-notification-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-sheet.component.html',
  styleUrls: ['./notification-sheet.component.css']
})
export class NotificationSheetComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeSheet = new EventEmitter<void>();
  @Output() markAsRead = new EventEmitter<string>();

  notifications: NotificationMessage[] = [];
  
  private router = inject(Router);

  ngOnInit(): void {
    this.loadNotifications();
    this.addWelcomeMessage();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private loadNotifications(): void {
    // Load existing notifications from localStorage or service
    const stored = localStorage.getItem('wayzon_notifications');
    if (stored) {
      this.notifications = JSON.parse(stored);
    }
  }

  private saveNotifications(): void {
    localStorage.setItem('wayzon_notifications', JSON.stringify(this.notifications));
  }

  private addWelcomeMessage(): void {
    // Check if welcome message already exists
    const hasWelcome = this.notifications.some(n => n.type === 'welcome');
    
    if (!hasWelcome) {
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
      
      this.notifications.unshift(welcomeMessage);
      this.saveNotifications();
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

  onMarkAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
      this.markAsRead.emit(notificationId);
    }
  }

  onActionClick(action: NotificationAction, notificationId: string): void {
    this.onMarkAsRead(notificationId);
    this.router.navigate([action.route]);
    this.closeSheet.emit();
  }

  onClose(): void {
    this.closeSheet.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'welcome': return 'waving_hand';
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      default: return 'notifications';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'welcome': return 'from-blue-500 to-purple-500';
      case 'info': return 'from-blue-500 to-cyan-500';
      case 'success': return 'from-green-500 to-emerald-500';
      case 'warning': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}
