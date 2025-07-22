import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-50 flex items-center justify-center"
         [@fadeInOut]>
      
      <!-- Main Loader -->
      <div class="text-center">
        
        <!-- Animated Icon -->
        <div class="mb-6 relative">
          <div class="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300 relative overflow-hidden">
            <!-- Shimmer Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            <span class="material-icons text-white text-3xl relative z-10">{{ icon }}</span>
          </div>
          
          <!-- Pulse Ring -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-24 h-24 border-4 border-blue-300/30 rounded-2xl animate-ping"></div>
          </div>
        </div>

        <!-- Loading Text -->
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600 mb-6">{{ subtitle }}</p>

        <!-- Progress Dots -->
        <div class="flex justify-center space-x-2">
          <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PageLoaderComponent {
  @Input() title = 'Loading...';
  @Input() subtitle = 'Please wait';
  @Input() icon = 'hourglass_empty';
}
