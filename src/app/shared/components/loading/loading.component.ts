import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-300">
      <div class="relative flex flex-col items-center">
        <!-- Logo Container with Pulse Effect -->
        <div class="relative w-24 h-24 mb-4">
          <!-- Outer spinning ring -->
          <div class="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
          
          <!-- Inner logo -->
          <div class="absolute inset-2 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden p-3">
             <img src="assets/images/logo.png" alt="Loading..." class="w-full h-full object-contain animate-pulse">
          </div>
        </div>
        
        <!-- Loading Text -->
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            {{ message }}
          </h3>
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = 'Loading...';
}
