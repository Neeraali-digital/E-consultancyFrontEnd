import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';
import { NotificationService } from '../../shared/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Mobile menu state
  isMobileMenuOpen = false;

  // Dropdown states
  isAboutDropdownOpen = false;
  isServicesDropdownOpen = false;
  isCoursesDropdownOpen = false;
  isAbroadDropdownOpen = false;
  isMoreDropdownOpen = false;

  // Scroll state for header styling
  isScrolled = false;

  // Notification system
  showNotifications = false;
  unreadCount = 0;
  private notificationSubscription?: Subscription;
  private routerSubscription?: Subscription;

  // Message system
  showMessages = false;
  unreadMessages = 1; // Start with 1 to show the help message
  shouldAnimateIcon = false;

  // Navigation state
  isNavigating = false;
  currentRoute = '';

  // Latest updates carousel
  currentUpdateIndex = 0;
  private updateInterval: any;



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

  // Abroad countries data
  abroadCountries = [
    {
      name: 'Georgia',
      code: 'georgia',
      flag: 'https://flagcdn.com/w40/ge.png'
    },
    {
      name: 'Russia',
      code: 'russia',
      flag: 'https://flagcdn.com/w40/ru.png'
    },
    {
      name: 'Armenia',
      code: 'armenia',
      flag: 'https://flagcdn.com/w40/am.png'
    },
    {
      name: 'Uzbekistan',
      code: 'uzbekistan',
      flag: 'https://flagcdn.com/w40/uz.png'
    },
    {
      name: 'Kazakhstan',
      code: 'kazakhstan',
      flag: 'https://flagcdn.com/w40/kz.png'
    }
  ];

  moreOptions = [
    {
      title: 'FAQ',
      description: 'Frequently Asked Questions',
      icon: 'help_outline',
      iconBg: 'bg-blue-600',
      route: '/faq',
      hoverClass: 'hover:from-blue-50 hover:to-blue-100'
    },
    {
      title: 'LATEST UPDATES',
      description: 'Stay updated with recent news',
      icon: 'notifications_active',
      iconBg: 'bg-green-600',
      route: '/updates',
      hoverClass: 'hover:from-green-50 hover:to-green-100'
    },
    {
      title: 'BLOGS',
      description: 'Educational insights & articles',
      icon: 'article',
      iconBg: 'bg-purple-600',
      route: '/blogs',
      hoverClass: 'hover:from-purple-50 hover:to-purple-100'
    },
    {
      title: 'FRANCHISE',
      description: 'Business partnership opportunities',
      icon: 'business_center',
      iconBg: 'bg-orange-600',
      route: '/franchise',
      hoverClass: 'hover:from-orange-50 hover:to-orange-100'
    }
  ];

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Ensure all dropdowns are closed on initialization
    this.closeAllDropdowns();

    this.startUpdateCarousel();
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }

    // Subscribe to notification updates
    this.notificationSubscription = this.notificationService.getUnreadCount().subscribe(
      count => this.unreadCount = count
    );

    // Subscribe to router events to track route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });

    // Animate message icon on page load
    this.animateMessageIcon();

    // Track current route for active state
    this.updateCurrentRoute();
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    window.removeEventListener('scroll', this.onScroll);

    // Unsubscribe from notifications
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }

    // Unsubscribe from router events
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    // Restore body scroll on component destroy
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  // Mobile menu toggle
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  // Close mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  // Update body scroll based on mobile menu state
  private updateBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  // Dropdown toggles
  toggleAboutDropdown() {
    this.isAboutDropdownOpen = !this.isAboutDropdownOpen;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
    this.isAbroadDropdownOpen = false;
    this.isMoreDropdownOpen = false;
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    this.isAboutDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
    this.isAbroadDropdownOpen = false;
    this.isMoreDropdownOpen = false;
  }

  toggleCoursesDropdown() {
    this.isCoursesDropdownOpen = !this.isCoursesDropdownOpen;
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isAbroadDropdownOpen = false;
    this.isMoreDropdownOpen = false;
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

  // Legacy notification methods (kept for compatibility)
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }



  // Navigation debugging method
  onNavigate(route: string): void {
    this.router.navigate([`/${route}`]).then((success: boolean) => {
      // Navigation successful
    }).catch((error: any) => {
      // Handle navigation error
    });
  }

  // Enhanced navigation method with event handling
  navigateToRoute(route: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.isNavigating = true;

    // Close mobile menu when navigating
    this.closeMobileMenu();
    this.closeAllDropdowns();

    try {
      // Method 1: Try router.navigate
      this.router.navigate([route]).then((success: boolean) => {
        this.isNavigating = false;
        // Route will be updated automatically via router subscription
        // Ensure scroll to top after navigation
        setTimeout(() => {
          this.scrollService.scrollToTop();
        }, 100);
      }).catch((error: any) => {
        this.fallbackNavigation(route);
      });
    } catch (error) {
      this.fallbackNavigation(route);
    }
  }

  private fallbackNavigation(route: string): void {
    try {
      // Method 2: Try navigateByUrl
      this.router.navigateByUrl(route).then((success: boolean) => {
        this.isNavigating = false;
        // Ensure scroll to top after navigation
        setTimeout(() => {
          this.scrollService.scrollToTop();
        }, 100);
      }).catch((error: any) => {
        this.windowNavigation(route);
      });
    } catch (error) {
      this.windowNavigation(route);
    }
  }

  private windowNavigation(route: string): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.isNavigating = false;
      window.location.href = route;
    }
  }

  // Abroad dropdown methods
  toggleAbroadDropdown(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Close other dropdowns first
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
    this.isMoreDropdownOpen = false;

    // Toggle the abroad dropdown
    this.isAbroadDropdownOpen = !this.isAbroadDropdownOpen;
  }

  closeAbroadDropdown() {
    this.isAbroadDropdownOpen = false;
  }

  // Navigation methods for abroad countries
  navigateToCountry(countryCode: string): void {
    this.router.navigate(['/abroad', countryCode]).then(() => {
      // Ensure scroll to top after navigation
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
    this.closeAbroadDropdown();
  }

  showMoreCountries(): void {
    this.router.navigate(['/abroad']).then(() => {
      // Ensure scroll to top after navigation
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
    this.closeAbroadDropdown();
  }
  // More dropdown methods
  toggleMoreDropdown(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Close other dropdowns first
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
    this.isAbroadDropdownOpen = false;

    // Toggle the more dropdown
    this.isMoreDropdownOpen = !this.isMoreDropdownOpen;
  }

  closeMoreDropdown() {
    this.isMoreDropdownOpen = false;
  }

  // Close all dropdowns method
  closeAllDropdowns() {
    this.isAboutDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isCoursesDropdownOpen = false;
    this.isAbroadDropdownOpen = false;
    this.isMoreDropdownOpen = false;
  }

  // Enhanced document click handler for better dropdown management
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Check if click is on abroad dropdown elements
    const isAbroadClick = target.closest('[data-dropdown="abroad"]') ||
                         target.closest('.dropdown-container[data-dropdown-state="true"]');

    // Check if click is on more dropdown elements
    const isMoreClick = target.closest('[data-dropdown="more"]') ||
                       target.closest('.dropdown-container[data-dropdown-state="true"]');

    // Close abroad dropdown if clicking outside
    if (!isAbroadClick && this.isAbroadDropdownOpen) {
      this.isAbroadDropdownOpen = false;
    }

    // Close more dropdown if clicking outside
    if (!isMoreClick && this.isMoreDropdownOpen) {
      this.isMoreDropdownOpen = false;
    }
  }

  // Navigation method for more options
  navigateToMoreOption(route: string): void {
    // Close mobile menu and all dropdowns
    this.closeMobileMenu();
    this.closeAllDropdowns();

    this.router.navigate([route]).then(() => {
      // Ensure scroll to top after navigation
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
  }

  // Message system methods
  toggleMessages(): void {
    this.showMessages = !this.showMessages;
    if (this.showMessages) {
      // Mark messages as read when opened
      this.unreadMessages = 0;
    }
  }

  animateMessageIcon(): void {
    // Animate icon on page load to indicate new message
    setTimeout(() => {
      this.shouldAnimateIcon = true;
      setTimeout(() => {
        this.shouldAnimateIcon = false;
      }, 1000); // Animation duration
    }, 1500); // Delay before animation starts
  }

  // Navigation methods for message actions
  navigateToColleges(): void {
    this.showMessages = false;
    this.router.navigate(['/colleges']).then(() => {
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
  }

  navigateToUniversities(): void {
    this.showMessages = false;
    this.router.navigate(['/colleges']).then(() => { // Using colleges route for now
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
  }

  navigateToContact(): void {
    this.showMessages = false;
    this.router.navigate(['/contact']).then(() => {
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
  }

  navigateToAbroad(): void {
    this.showMessages = false;
    this.router.navigate(['/abroad']).then(() => {
      setTimeout(() => {
        this.scrollService.scrollToTop();
      }, 100);
    });
  }

  // Active route checking methods
  updateCurrentRoute(): void {
    this.currentRoute = this.router.url;
  }

  isRouteActive(route: string): boolean {
    const currentUrl = this.router.url;
    // Handle root route
    if (route === '/home' && (currentUrl === '/' || currentUrl === '/home')) {
      return true;
    }
    // Handle other routes
    return currentUrl === route || currentUrl.startsWith(route + '/');
  }

  // Simple logo click navigation
  onLogoClick(): void {
    // Navigate to home
    this.router.navigate(['/']);
  }

  // Simple logo click for navigation
  // (3D effects removed for clean brand appearance)

  getDropdownPosition() {
    return {
      top: 70, // Position below header
      left: 200, // Adjust as needed for abroad dropdown
      right: 50  // Adjust as needed for more dropdown
    };
  }

}
