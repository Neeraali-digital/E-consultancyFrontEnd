import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="glass-card relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2"
      [class]="cardClasses"
      [style.animation-delay]="animationDelay"
      (mouseenter)="onHover(true)"
      (mouseleave)="onHover(false)">
      
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-500"
           [class.opacity-20]="isHovered"
           [ngClass]="gradientClass"></div>
      
      <!-- Shimmer Effect -->
      <div class="absolute inset-0 opacity-0 transition-opacity duration-700"
           [class.opacity-100]="isHovered">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-slow"></div>
      </div>
      
      <!-- Border Glow -->
      <div class="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-500"
           [class.opacity-100]="isHovered"
           [style.box-shadow]="glowShadow"></div>
      
      <!-- Content -->
      <div class="relative z-10 h-full">
        <ng-content></ng-content>
      </div>
      
      <!-- Floating Particles -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit" *ngIf="showParticles">
        <div *ngFor="let particle of particles; trackBy: trackParticle" 
             class="absolute w-1 h-1 rounded-full opacity-60 animate-float"
             [style.left.px]="particle.x"
             [style.top.px]="particle.y"
             [style.background-color]="particle.color"
             [style.animation-delay]="particle.delay + 's'"
             [style.animation-duration]="particle.duration + 's'"></div>
      </div>
    </div>
  `,
  styles: [`
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    .glass-card:hover {
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes shimmer-slow {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .animate-shimmer-slow {
      animation: shimmer-slow 3s infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 1;
      }
    }
    
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
  `]
})
export class GlassCardComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() rounded: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'xl';
  @Input() showParticles = false;
  @Input() animationDelay = '0ms';
  
  isHovered = false;
  particles: Array<{x: number, y: number, color: string, delay: number, duration: number}> = [];
  
  get cardClasses(): string {
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    };
    
    const roundedClasses = {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      xl: 'rounded-3xl',
      '2xl': 'rounded-[2rem]'
    };
    
    return `${sizeClasses[this.size]} ${roundedClasses[this.rounded]}`;
  }
  
  get gradientClass(): string {
    const gradients = {
      primary: 'from-blue-500 to-purple-600',
      secondary: 'from-gray-500 to-gray-700',
      success: 'from-green-500 to-emerald-600',
      warning: 'from-yellow-500 to-orange-600',
      danger: 'from-red-500 to-pink-600'
    };
    
    return gradients[this.variant];
  }
  
  get glowShadow(): string {
    const glows = {
      primary: '0 0 30px rgba(59, 130, 246, 0.3)',
      secondary: '0 0 30px rgba(107, 114, 128, 0.3)',
      success: '0 0 30px rgba(34, 197, 94, 0.3)',
      warning: '0 0 30px rgba(251, 191, 36, 0.3)',
      danger: '0 0 30px rgba(239, 68, 68, 0.3)'
    };
    
    return glows[this.variant];
  }
  
  ngOnInit(): void {
    if (this.showParticles) {
      this.generateParticles();
    }
  }
  
  onHover(hovered: boolean): void {
    this.isHovered = hovered;
  }
  
  private generateParticles(): void {
    const colors = {
      primary: ['#3b82f6', '#8b5cf6', '#ec4899'],
      secondary: ['#6b7280', '#9ca3af', '#d1d5db'],
      success: ['#22c55e', '#10b981', '#059669'],
      warning: ['#f59e0b', '#f97316', '#ea580c'],
      danger: ['#ef4444', '#f43f5e', '#ec4899']
    };
    
    const particleColors = colors[this.variant];
    
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: Math.random() * 300,
        y: Math.random() * 200,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      });
    }
  }
  
  trackParticle(index: number): number {
    return index;
  }
}
