import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  currentUser: any = null;
  showUserMenu = false;
  showNotifications = false;
  notifications: any[] = [];
  unreadCount = 0;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadNotifications();
  }

  private loadCurrentUser(): void {
    this.currentUser = this.adminService.getCurrentUser();
  }

  private loadNotifications(): void {
    // Mock notifications - replace with actual service call
    this.notifications = [
      {
        id: 1,
        title: 'New College Application',
        message: 'IIT Delhi submitted new course information',
        time: '2 minutes ago',
        read: false,
        type: 'info'
      },
      {
        id: 2,
        title: 'System Update',
        message: 'Database backup completed successfully',
        time: '1 hour ago',
        read: false,
        type: 'success'
      },
      {
        id: 3,
        title: 'New User Registration',
        message: '5 new students registered today',
        time: '3 hours ago',
        read: true,
        type: 'info'
      }
    ];
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  markNotificationAsRead(notification: any): void {
    notification.read = true;
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  onLogout(): void {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }

  onProfile(): void {
    // Navigate to profile page
    console.log('Navigate to profile');
  }

  onSettings(): void {
    this.router.navigate(['/admin/settings']);
  }

  getCurrentPageTitle(): string {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);

    if (segments.length < 2) return 'Dashboard';

    const pageMap: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'colleges': 'Colleges Management',
      'courses': 'Courses Management',
      'blogs': 'Blog Management',
      'users': 'User Management',
      'inquiries': 'Inquiries',
      'settings': 'Settings'
    };

    const currentPage = segments[1];
    return pageMap[currentPage] || 'Admin Panel';
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.notifications-menu')) {
      this.showUserMenu = false;
      this.showNotifications = false;
    }
  }
}
