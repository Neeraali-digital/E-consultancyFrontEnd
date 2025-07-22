import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-college-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 z-50 flex items-center justify-center"
         [@fadeIn]>
      
      <!-- Floating Buildings -->
      <div class="absolute inset-0 overflow-hidden">
        <div *ngFor="let building of floatingBuildings; let i = index"
             class="absolute opacity-15"
             [style.left.%]="building.x"
             [style.top.%]="building.y"
             [style.animation-delay]="building.delay + 's'"
             [@floatBuilding]>
          <span class="material-icons text-5xl text-emerald-400">account_balance</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 text-center">
        
        <!-- Animated College Icon -->
        <div class="mb-8 relative">
          <div class="w-28 h-28 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden"
               [@buildingRise]>
            <!-- Shimmer -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            <span class="material-icons text-white text-5xl relative z-10">account_balance</span>
          </div>
          
          <!-- Campus Elements -->
          <div class="absolute inset-0 flex items-center justify-center">
            <!-- Trees -->
            <div class="absolute -top-2 -left-8 text-green-400 animate-sway">
              <span class="material-icons text-2xl">park</span>
            </div>
            <div class="absolute -top-2 -right-8 text-green-400 animate-sway" style="animation-delay: 1s">
              <span class="material-icons text-2xl">park</span>
            </div>
            
            <!-- Students -->
            <div class="absolute -bottom-4 -left-6 text-blue-500 animate-bounce" style="animation-delay: 0.5s">
              <span class="material-icons text-lg">person</span>
            </div>
            <div class="absolute -bottom-4 -right-6 text-purple-500 animate-bounce" style="animation-delay: 1.5s">
              <span class="material-icons text-lg">person</span>
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2"
              [@slideInUp]>
            Loading Colleges
          </h1>
          <p class="text-lg text-gray-600 animate-pulse">
            Finding the perfect institutions for you...
          </p>
        </div>

        <!-- Campus Animation -->
        <div class="mb-8 relative">
          <div class="flex justify-center items-end space-x-2">
            <div *ngFor="let building of campusBuildings; let i = index"
                 class="bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-lg shadow-lg"
                 [style.width.px]="building.width"
                 [style.height.px]="building.height"
                 [style.animation-delay]="i * 200 + 'ms'"
                 [@buildUp]>
              <div class="w-full h-2 bg-emerald-600 rounded-t-lg"></div>
            </div>
          </div>
          
          <!-- Campus Ground -->
          <div class="w-64 h-2 bg-green-300 rounded-full mx-auto mt-2 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-wave"></div>
          </div>
        </div>

        <!-- College Types -->
        <div class="grid grid-cols-2 gap-4 max-w-xs mx-auto opacity-70">
          <div *ngFor="let type of collegeTypes; let i = index"
               class="flex flex-col items-center space-y-2 p-3 bg-white/60 rounded-xl backdrop-blur-sm"
               [style.animation-delay]="i * 400 + 'ms'"
               [@fadeInScale]>
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span class="material-icons text-white text-sm">{{ type.icon }}</span>
            </div>
            <span class="text-xs text-gray-600 font-medium">{{ type.name }}</span>
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
    
    @keyframes sway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    
    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    .animate-sway {
      animation: sway 3s ease-in-out infinite;
    }
    
    .animate-wave {
      animation: wave 3s ease-in-out infinite;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('buildingRise', [
      transition(':enter', [
        style({ transform: 'translateY(50px) scale(0.8)', opacity: 0 }),
        animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('buildUp', [
      transition(':enter', [
        style({ transform: 'scaleY(0)', transformOrigin: 'bottom' }),
        animate('600ms ease-out', style({ transform: 'scaleY(1)' }))
      ])
    ]),
    trigger('fadeInScale', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('floatBuilding', [
      transition(':enter', [
        animate('10s ease-in-out infinite', keyframes([
          style({ transform: 'translateY(0px) rotate(0deg)', offset: 0 }),
          style({ transform: 'translateY(-15px) rotate(2deg)', offset: 0.25 }),
          style({ transform: 'translateY(-5px) rotate(-1deg)', offset: 0.5 }),
          style({ transform: 'translateY(-25px) rotate(3deg)', offset: 0.75 }),
          style({ transform: 'translateY(0px) rotate(0deg)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class CollegeLoaderComponent {
  floatingBuildings = [
    { x: 5, y: 15, delay: 0 },
    { x: 90, y: 20, delay: 1.5 },
    { x: 10, y: 75, delay: 3 },
    { x: 85, y: 80, delay: 4.5 },
    { x: 45, y: 5, delay: 6 }
  ];

  campusBuildings = [
    { width: 30, height: 40 },
    { width: 25, height: 60 },
    { width: 35, height: 45 },
    { width: 28, height: 55 },
    { width: 32, height: 35 }
  ];

  collegeTypes = [
    { name: 'University', icon: 'school' },
    { name: 'Institute', icon: 'business' },
    { name: 'Academy', icon: 'auto_stories' },
    { name: 'Campus', icon: 'location_city' }
  ];
}
