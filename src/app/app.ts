import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layout/header/header.component";
import { Footer } from "./layout/footer/footer";
import { AiChatComponent } from "./shared/components/ai-chat/ai-chat.component";
import { ScrollToTopComponent } from "./shared/components/scroll-to-top/scroll-to-top.component";
import { ScrollService } from "./shared/services/scroll.service";
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Footer, AiChatComponent, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('E-consultancyFrontend');
  isAdminRoute = false;
  private subscription = new Subscription();

  // Inject ScrollService to initialize scroll-to-top functionality
  private scrollService = inject(ScrollService);
  private router = inject(Router);

  ngOnInit(): void {
    // Listen to route changes to determine if we're in admin area
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.isAdminRoute = event.url.startsWith('/admin');
        })
    );

    // Set initial state
    this.isAdminRoute = this.router.url.startsWith('/admin');

    // Force favicon update
    this.updateFavicon();
  }

  private updateFavicon(): void {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());

    // Add your actual favicon with cache busting
    const timestamp = new Date().getTime();

    // Your actual favicon
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/x-icon';
    faviconLink.href = `assets/favicon.ico?v=${timestamp}`;
    document.head.appendChild(faviconLink);

    // Fallback favicon
    const icoLink = document.createElement('link');
    icoLink.rel = 'shortcut icon';
    icoLink.type = 'image/x-icon';
    icoLink.href = `favicon.ico?v=${timestamp}`;
    document.head.appendChild(icoLink);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
