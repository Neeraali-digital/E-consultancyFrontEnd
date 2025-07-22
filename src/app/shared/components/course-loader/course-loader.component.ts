import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-course-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 z-50 flex items-center justify-center"
         [@fadeIn]>
      
      <!-- Floating Books Animation -->
      <div class="absolute inset-0 overflow-hidden">
        <div *ngFor="let book of floatingBooks; let i = index"
             class="absolute opacity-20"
             [style.left.%]="book.x"
             [style.top.%]="book.y"
             [style.animation-delay]="book.delay + 's'"
             [@floatBook]>
          <span class="material-icons text-4xl text-purple-400">menu_book</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 text-center">
        
        <!-- Animated Course Icon -->
        <div class="mb-8 relative">
          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden"
               [@pulseScale]>
            <!-- Shimmer -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            <span class="material-icons text-white text-4xl relative z-10">school</span>
          </div>
          
          <!-- Orbiting Elements -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 border-2 border-purple-300/30 rounded-full animate-spin-slow">
              <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div class="absolute w-40 h-40 border-2 border-indigo-300/20 rounded-full animate-spin-reverse">
              <div class="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div class="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2"
              [@slideInUp]>
            Loading Courses
          </h1>
          <p class="text-lg text-gray-600 animate-pulse">
            Discovering amazing learning opportunities...
          </p>
        </div>

        <!-- Progress Animation -->
        <div class="mb-6">
          <div class="flex justify-center space-x-3 mb-4">
            <div *ngFor="let dot of progressDots; let i = index"
                 class="w-4 h-4 rounded-full"
                 [style.background-color]="dot.color"
                 [style.animation-delay]="i * 200 + 'ms'"
                 [@bounceIn]></div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-progress"></div>
          </div>
        </div>

        <!-- Course Categories Preview -->
        <div class="flex justify-center space-x-6 opacity-60">
          <div *ngFor="let category of courseCategories; let i = index"
               class="flex flex-col items-center space-y-2"
               [style.animation-delay]="i * 300 + 'ms'"
               [@fadeInUp]>
            <div class="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-purple-600">{{ category.icon }}</span>
            </div>
            <span class="text-xs text-gray-500 font-medium">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
    
    @keyframes progress {
      0% { width: 0%; }
      100% { width: 100%; }
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
    
    .animate-progress {
      animation: progress 2s ease-in-out infinite;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('pulseScale', [
      transition(':enter', [
        animate('2s ease-in-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('floatBook', [
      transition(':enter', [
        animate('8s ease-in-out infinite', keyframes([
          style({ transform: 'translateY(0px) rotate(0deg)', offset: 0 }),
          style({ transform: 'translateY(-20px) rotate(5deg)', offset: 0.25 }),
          style({ transform: 'translateY(-10px) rotate(-3deg)', offset: 0.5 }),
          style({ transform: 'translateY(-30px) rotate(8deg)', offset: 0.75 }),
          style({ transform: 'translateY(0px) rotate(0deg)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class CourseLoaderComponent {
  floatingBooks = [
    { x: 10, y: 20, delay: 0 },
    { x: 85, y: 15, delay: 1 },
    { x: 15, y: 80, delay: 2 },
    { x: 80, y: 75, delay: 3 },
    { x: 50, y: 10, delay: 4 },
    { x: 20, y: 50, delay: 5 }
  ];

  progressDots = [
    { color: '#8b5cf6' },
    { color: '#3b82f6' },
    { color: '#06b6d4' },
    { color: '#10b981' }
  ];

  courseCategories = [
    { name: 'Engineering', icon: 'engineering' },
    { name: 'Medical', icon: 'medical_services' },
    { name: 'Business', icon: 'business_center' },
    { name: 'Arts', icon: 'palette' }
  ];
}
