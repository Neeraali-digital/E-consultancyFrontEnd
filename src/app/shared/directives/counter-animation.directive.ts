import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
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
    private counterService: CounterAnimationService
  ) {}

  ngOnInit() {
    // Set initial value to 0
    this.el.nativeElement.textContent = '0';
    
    // Create intersection observer to trigger animation when element comes into view
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

    this.observer.observe(this.el.nativeElement);
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
