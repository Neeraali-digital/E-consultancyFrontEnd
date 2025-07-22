import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { ParticleBackgroundComponent } from '../../../../shared/components/particle-background/particle-background.component';
import { AiAssistantComponent } from '../../../../shared/components/ai-assistant/ai-assistant.component';
import { MinimalLoaderComponent } from '../../../../shared/components/minimal-loader/minimal-loader.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminHeaderComponent, AdminSidebarComponent, ParticleBackgroundComponent, AiAssistantComponent, MinimalLoaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  isSidebarCollapsed = false;
  isMobile = false;
  isLoading = true; // Start with loading true
  showQuickActions = false;
  private subscription = new Subscription();

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Instant initialization - no loading screen needed
    this.isLoading = false;
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    window.addEventListener('closeMobileSidebar', () => this.onMobileOverlayClick());
    this.setupClickOutsideListener();

    // Force change detection after initialization
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngAfterViewInit(): void {
    // Force another change detection after view init
    setTimeout(() => {
      this.checkScreenSize();
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    window.removeEventListener('resize', () => this.checkScreenSize());
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  private checkScreenSize(): void {
    const previousMobile = this.isMobile;
    const previousCollapsed = this.isSidebarCollapsed;

    this.isMobile = window.innerWidth < 768;

    if (this.isMobile) {
      this.isSidebarCollapsed = true;
      this.showQuickActions = false; // Hide quick actions on mobile
    } else {
      // Ensure sidebar is visible on desktop
      this.isSidebarCollapsed = false;
    }

    // Force change detection if state changed
    if (previousMobile !== this.isMobile || previousCollapsed !== this.isSidebarCollapsed) {
      this.cdr.detectChanges();
    }

    console.log('Screen size check:', {
      isMobile: this.isMobile,
      isSidebarCollapsed: this.isSidebarCollapsed,
      windowWidth: window.innerWidth
    });
  }

  private setupClickOutsideListener(): void {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  private handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const quickActionsButton = target.closest('.fixed.bottom-6.right-6');

    if (!quickActionsButton && this.showQuickActions) {
      this.showQuickActions = false;
    }
  }

  onSidebarToggle(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onMobileOverlayClick(): void {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  toggleQuickActions(): void {
    this.showQuickActions = !this.showQuickActions;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
