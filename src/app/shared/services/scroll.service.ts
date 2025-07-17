import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router) {
    // Listen to route changes and scroll to top
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  /**
   * Scrolls to the top of the page smoothly
   */
  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Scrolls to a specific element by ID
   */
  scrollToElement(elementId: string): void {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }

  /**
   * Scrolls to a specific position
   */
  scrollToPosition(top: number, left: number = 0): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top,
        left,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Gets current scroll position
   */
  getCurrentScrollPosition(): { x: number; y: number } {
    if (typeof window !== 'undefined') {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return { x: 0, y: 0 };
  }

  /**
   * Checks if user has scrolled past a certain point
   */
  hasScrolledPast(threshold: number): boolean {
    const position = this.getCurrentScrollPosition();
    return position.y > threshold;
  }
}
