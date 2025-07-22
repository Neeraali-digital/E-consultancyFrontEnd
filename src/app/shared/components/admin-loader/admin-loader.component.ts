import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-admin-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-50 flex items-center justify-center"
         [@fadeInOut]>
      
      <!-- Particle Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div *ngFor="let particle of particles; let i = index"
             class="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
             [style.left.%]="particle.x"
             [style.top.%]="particle.y"
             [style.animation-delay]="particle.delay + 's'"
             [style.animation-duration]="particle.duration + 's'"></div>
      </div>

      <!-- Main Loader Container -->
      <div class="relative z-10 text-center">
        
        <!-- Logo Animation -->
        <div class="mb-8 relative">
          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500 relative overflow-hidden">
            <!-- Shimmer Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            <span class="material-icons text-white text-4xl relative z-10 animate-pulse">school</span>
          </div>
          
          <!-- Floating Rings -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 border-4 border-blue-300/30 rounded-full animate-spin-slow"></div>
            <div class="absolute w-40 h-40 border-2 border-purple-300/20 rounded-full animate-spin-reverse"></div>
          </div>
        </div>

        <!-- Brand Text -->
        <div class="mb-8">
          <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-2 animate-gradient">
            WAYZON
          </h1>
          <p class="text-lg text-gray-600 font-semibold tracking-wider">
            ADMIN DASHBOARD
          </p>
        </div>

        <!-- Loading Animation -->
        <div class="mb-8">
          <div class="flex justify-center space-x-2 mb-4">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-progress"></div>
          </div>
        </div>

        <!-- Loading Text -->
        <div class="text-gray-600">
          <p class="text-lg font-medium mb-2">{{ loadingText }}</p>
          <p class="text-sm opacity-75">Please wait while we prepare your dashboard...</p>
        </div>

        <!-- Feature Icons -->
        <div class="mt-8 flex justify-center space-x-6">
          <div class="flex flex-col items-center space-y-2 opacity-60">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span class="material-icons text-blue-600">analytics</span>
            </div>
            <span class="text-xs text-gray-500">Analytics</span>
          </div>
          <div class="flex flex-col items-center space-y-2 opacity-60">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span class="material-icons text-purple-600">dashboard</span>
            </div>
            <span class="text-xs text-gray-500">Dashboard</span>
          </div>
          <div class="flex flex-col items-center space-y-2 opacity-60">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span class="material-icons text-indigo-600">settings</span>
            </div>
            <span class="text-xs text-gray-500">Settings</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(120deg); }
      66% { transform: translateY(-10px) rotate(240deg); }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes progress {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    .animate-spin-slow {
      animation: spin-slow 4s linear infinite;
    }
    
    .animate-spin-reverse {
      animation: spin-reverse 6s linear infinite;
    }
    
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
    
    .animate-progress {
      animation: progress 3s ease-in-out infinite;
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminLoaderComponent {
  @Input() loadingText = 'Loading Dashboard...';
  
  particles: Array<{x: number, y: number, delay: number, duration: number}> = [];
  
  constructor() {
    this.generateParticles();
    this.cycleLoadingText();
  }
  
  private generateParticles(): void {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4
      });
    }
  }
  
  private cycleLoadingText(): void {
    // Simplified - no cycling needed for fast loading
    this.loadingText = 'Loading Dashboard...';
  }
}
