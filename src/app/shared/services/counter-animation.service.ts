import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterAnimationService {

  constructor() { }

  /**
   * Animates a number from 0 to target value
   * @param target - The target number to count to
   * @param duration - Animation duration in milliseconds (default: 2000)
   * @param suffix - Optional suffix like '+', 'K+', '%' etc.
   * @returns Observable that emits the current count value
   */
  animateCount(target: number, duration: number = 2000, suffix: string = ''): Observable<string> {
    const subject = new BehaviorSubject<string>('0' + suffix);
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutQuart easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeProgress * target);
      
      subject.next(this.formatNumber(currentValue) + suffix);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        subject.next(this.formatNumber(target) + suffix);
        subject.complete();
      }
    };
    
    requestAnimationFrame(animate);
    return subject.asObservable();
  }

  /**
   * Formats numbers with appropriate suffixes (K, M, etc.)
   * @param num - Number to format
   * @returns Formatted string
   */
  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  /**
   * Parses a string with suffix to get the numeric value
   * @param value - String like "10K+", "95%", "500+"
   * @returns Numeric value
   */
  parseValue(value: string): { number: number; suffix: string } {
    const match = value.match(/^(\d+(?:\.\d+)?)(K|M)?(.*)$/);
    if (!match) return { number: parseInt(value) || 0, suffix: '' };
    
    let number = parseFloat(match[1]);
    const multiplier = match[2];
    const suffix = (match[2] || '') + (match[3] || '');
    
    if (multiplier === 'K') number *= 1000;
    if (multiplier === 'M') number *= 1000000;
    
    return { number, suffix };
  }
}
