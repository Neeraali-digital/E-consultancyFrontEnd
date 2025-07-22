import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, AfterViewInit {
  @Input() isCollapsed = false;
  @Input() isMobile = false;

  activeRoute = '';
  expandedMenus: Set<string> = new Set();
  isInitialized = false;

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard'
    },
    {
      id: 'colleges',
      label: 'Colleges',
      icon: 'account_balance',
      children: [
        {
          id: 'colleges-list',
          label: 'All Colleges',
          icon: 'list',
          route: '/admin/colleges'
        },
        {
          id: 'colleges-add',
          label: 'Add College',
          icon: 'add',
          route: '/admin/colleges/add'
        }
      ]
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: 'school',
      children: [
        {
          id: 'courses-list',
          label: 'All Courses',
          icon: 'list',
          route: '/admin/courses'
        },
        {
          id: 'courses-add',
          label: 'Add Course',
          icon: 'add',
          route: '/admin/courses/add'
        }
      ]
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: 'article',
      children: [
        {
          id: 'blogs-list',
          label: 'All Blogs',
          icon: 'list',
          route: '/admin/blogs'
        },
        {
          id: 'blogs-add',
          label: 'Add Blog',
          icon: 'add',
          route: '/admin/blogs/add'
        }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'people',
      children: [
        {
          id: 'users-list',
          label: 'All Users',
          icon: 'list',
          route: '/admin/users'
        },
        {
          id: 'users-add',
          label: 'Add User',
          icon: 'person_add',
          route: '/admin/users/add'
        }
      ]
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: 'contact_support',
      route: '/admin/inquiries',
      badge: '12',
      badgeColor: 'bg-red-500'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/admin/settings'
    }
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('AdminSidebar ngOnInit - isCollapsed:', this.isCollapsed, 'isMobile:', this.isMobile);

    // Track active route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.url;
        this.updateExpandedMenus();
        this.cdr.detectChanges();
      });

    // Set initial active route
    this.activeRoute = this.router.url;
    this.updateExpandedMenus();
    this.isInitialized = true;

    // Force change detection
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngAfterViewInit(): void {
    console.log('AdminSidebar ngAfterViewInit - isCollapsed:', this.isCollapsed, 'isMobile:', this.isMobile);

    // Ensure sidebar is properly displayed after view init
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  private updateExpandedMenus(): void {
    // Auto-expand parent menus based on active route
    this.menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          child.route && this.activeRoute.startsWith(child.route)
        );
        if (hasActiveChild) {
          this.expandedMenus.add(item.id);
        }
      }
    });
  }

  toggleMenu(menuId: string): void {
    if (this.expandedMenus.has(menuId)) {
      this.expandedMenus.delete(menuId);
    } else {
      this.expandedMenus.add(menuId);
    }
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus.has(menuId);
  }

  isRouteActive(route: string): boolean {
    return this.activeRoute === route || this.activeRoute.startsWith(route + '/');
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child =>
      child.route && this.isRouteActive(child.route)
    );
  }

  closeSidebar(): void {
    // Emit event to parent to close sidebar on mobile
    if (this.isMobile) {
      // This will be handled by the parent component
      window.dispatchEvent(new CustomEvent('closeMobileSidebar'));
    }
  }

  onMenuItemClick(): void {
    // Close sidebar on mobile when menu item is clicked
    if (this.isMobile) {
      this.closeSidebar();
    }
  }
}
