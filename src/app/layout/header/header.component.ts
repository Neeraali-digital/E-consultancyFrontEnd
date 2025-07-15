import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Mobile menu state
  isMobileMenuOpen = false;

  // Dropdown states
  isAboutDropdownOpen = false;
  isServicesDropdownOpen = false;
  isCoursesDropdownOpen = false;

  // Scroll state for header styling
  isScrolled = false;

  // Notification system
  showNotifications = false;

  // Navigation state
  isNavigating = false;

  // Latest updates carousel
  currentUpdateIndex = 0;
  private updateInterval: any;

  notifications = [
    {
      id: 1,
      title: 'New Admission Alert',
      message: 'Direct admission open for Engineering courses',
      type: 'success',
      time: '2 min ago',
      icon: 'school',
      unread: true
    },
    {
      id: 2,
      title: 'Scholarship Update',
      message: 'Merit scholarships available for MBBS students',
      type: 'info',
      time: '1 hour ago',
      icon: 'monetization_on',
      unread: true
    },
    {
      id: 3,
      title: 'Application Deadline',
      message: 'MBA applications closing in 3 days',
      type: 'warning',
      time: '3 hours ago',
      icon: 'schedule',
      unread: false
    },
    {
      id: 4,
      title: 'Success Story',
      message: 'Congratulations to our IIT Delhi admit!',
      type: 'success',
      time: '1 day ago',
      icon: 'celebration',
      unread: false
    }
  ];

  latestUpdates = [
    {
      text: "AICTE introduced mandatory internship for civil engineers",
      date: "1 year ago"
    },
    {
      text: "New NEET counseling guidelines released for 2025 admissions",
      date: "2 weeks ago"
    },
    {
      text: "IIT JEE Advanced registration opens for 2025 batch",
      date: "1 month ago"
    },
    {
      text: "Direct admission available for top engineering colleges",
      date: "3 days ago"
    }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.startUpdateCarousel();
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    window.removeEventListener('scroll', this.onScroll);
  }

  // Mobile menu toggle
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Dropdown toggles
  toggleAboutDropdown() {
    this.isAboutDropdownOpen = !this.isAboutDropdownOpen;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    this.isAboutDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
  }

  toggleCoursesDropdown() {
    this.isCoursesDropdownOpen = !this.isCoursesDropdownOpen;
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
  }

  // Close all dropdowns
  closeAllDropdowns() {
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
  }

  // Updates carousel
  startUpdateCarousel() {
    this.updateInterval = setInterval(() => {
      this.currentUpdateIndex = (this.currentUpdateIndex + 1) % this.latestUpdates.length;
    }, 4000); // Change every 4 seconds
  }

  // Scroll listener for header styling
  setupScrollListener() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 50;
    }
  }

  // Notification methods
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.unread = false;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.unread = false);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  getNotificationTypeClass(type: string): string {
    const typeMap: { [key: string]: string } = {
      success: 'text-green-600 bg-green-100',
      info: 'text-blue-600 bg-blue-100',
      warning: 'text-orange-600 bg-orange-100',
      error: 'text-red-600 bg-red-100'
    };
    return typeMap[type] || 'text-gray-600 bg-gray-100';
  }

  // Navigation debugging method
  onNavigate(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([`/${route}`]).then(success => {
      console.log('Navigation success:', success);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  // Enhanced navigation method with event handling
  navigateToRoute(route: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('🚀 Navigation clicked! Route:', route);
    this.isNavigating = true;

    try {
      // Method 1: Try router.navigate
      this.router.navigate([route]).then(success => {
        console.log('✅ Router.navigate success:', success);
        this.isNavigating = false;
      }).catch(error => {
        console.error('❌ Router.navigate failed:', error);
        this.fallbackNavigation(route);
      });
    } catch (error) {
      console.error('❌ Navigation error:', error);
      this.fallbackNavigation(route);
    }
  }

  private fallbackNavigation(route: string): void {
    console.log('🔄 Trying fallback navigation to:', route);

    try {
      // Method 2: Try navigateByUrl
      this.router.navigateByUrl(route).then(success => {
        console.log('✅ NavigateByUrl success:', success);
        this.isNavigating = false;
      }).catch(error => {
        console.error('❌ NavigateByUrl failed:', error);
        this.windowNavigation(route);
      });
    } catch (error) {
      console.error('❌ NavigateByUrl error:', error);
      this.windowNavigation(route);
    }
  }

  private windowNavigation(route: string): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      console.log('🌐 Using window.location for:', route);
      this.isNavigating = false;
      window.location.href = route;
    }
  }

}
