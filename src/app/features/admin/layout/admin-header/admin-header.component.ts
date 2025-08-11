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
    console.log('Toggle clicked, current state:', this.showUserMenu);
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    console.log('New state:', this.showUserMenu);
    // Force change detection
    setTimeout(() => {
      console.log('After timeout, state:', this.showUserMenu);
    }, 100);
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
    if (confirm('Are you sure you want to logout?')) {
      this.adminService.logout();
      this.showUserMenu = false;
      this.router.navigate(['/admin/login']);
    }
  }

  onProfile(): void {
    console.log('Navigate to profile');
    this.showUserMenu = false;
  }

  onSettings(): void {
    this.router.navigate(['/admin/settings']);
    this.showUserMenu = false;
  }

  onActivityLog(): void {
    console.log('Navigate to activity log');
    this.showUserMenu = false;
  }

  getLastLoginTime(): string {
    return new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getPermissionCount(): string {
    const user = this.currentUser;
    return user?.permissions ? `${user.permissions.length} granted` : '0 granted';
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
    const userMenuContainer = target.closest('.user-dropdown');
    const notificationContainer = target.closest('.notifications-menu');
    
    if (!userMenuContainer && this.showUserMenu) {
      console.log('Closing user menu due to outside click');
      this.showUserMenu = false;
    }
    if (!notificationContainer && this.showNotifications) {
      this.showNotifications = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.showUserMenu || this.showNotifications) {
      this.showUserMenu = false;
      this.showNotifications = false;
    }
  }
}
