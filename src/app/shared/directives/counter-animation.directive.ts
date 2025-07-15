import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CounterAnimationService } from '../services/counter-animation.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appCounterAnimation]',
  standalone: true
})
export class CounterAnimationDirective implements OnInit, OnDestroy {
  @Input('appCounterAnimation') targetValue: string = '0';
  @Input() animationDuration: number = 2000;
  @Input() animationDelay: number = 0;

  private subscription?: Subscription;
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private counterService: CounterAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Set initial value to 0
    if (this.el && this.el.nativeElement) {
      this.el.nativeElement.textContent = '0';
    }

    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Create intersection observer to trigger animation when element comes into view
      if (typeof IntersectionObserver !== 'undefined') {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !this.hasAnimated) {
                this.startAnimation();
                this.hasAnimated = true;
              }
            });
          },
          { threshold: 0.1 }
        );

        if (this.el && this.el.nativeElement) {
          this.observer.observe(this.el.nativeElement);
        }
      } else {
        // Fallback for environments without IntersectionObserver
        setTimeout(() => this.startAnimation(), 500);
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private startAnimation() {
    setTimeout(() => {
      const { number, suffix } = this.counterService.parseValue(this.targetValue);
      
      this.subscription = this.counterService.animateCount(number, this.animationDuration, suffix)
        .subscribe(value => {
          this.el.nativeElement.textContent = value;
        });
    }, this.animationDelay);
  }
}
