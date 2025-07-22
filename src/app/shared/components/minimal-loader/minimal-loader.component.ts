import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minimal-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <!-- Simple Spinner -->
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        
        <!-- Simple Text -->
        <p class="text-gray-600 font-medium">{{ message }}</p>
      </div>
    </div>
  `
})
export class MinimalLoaderComponent {
  @Input() message = 'Loading...';
}
