import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Subscription } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  icon?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[9999] space-y-3" [@toastContainer]>
      <div *ngFor="let toast of toasts; trackBy: trackToast"
           class="toast-item max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-105"
           [class]="getToastClasses(toast)"
           [@toastSlide]>
        
        <!-- Toast Header -->
        <div class="flex items-start p-4">
          <!-- Icon -->
          <div class="flex-shrink-0 mr-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center"
                 [class]="getIconClasses(toast.type)">
              <span class="material-icons text-sm text-white">{{ getIcon(toast.type) }}</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-gray-900 mb-1">{{ toast.title }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ toast.message }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ toast.timestamp | date:'shortTime' }}</p>
          </div>
          
          <!-- Close Button -->
          <button (click)="removeToast(toast.id)"
                  class="flex-shrink-0 ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <span class="material-icons text-gray-400 text-sm">close</span>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div *ngIf="!toast.persistent && toast.duration"
             class="h-1 bg-gray-100">
          <div class="h-full transition-all ease-linear"
               [class]="getProgressBarClass(toast.type)"
               [style.animation-duration]="toast.duration + 'ms'"
               style="animation: progressBar linear forwards; width: 100%;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes progressBar {
      from { width: 100%; }
      to { width: 0%; }
    }
    
    .toast-item {
      backdrop-filter: blur(10px);
    }
  `],
  animations: [
    trigger('toastContainer', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          stagger(100, [
            animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('toastSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0, scale: 0.8 }),
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ transform: 'translateX(0)', opacity: 1, scale: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', 
          style({ transform: 'translateX(100%)', opacity: 0, scale: 0.8 }))
      ])
    ])
  ]
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    // Subscribe to notification service here
    // this.subscription.add(
    //   this.notificationService.getNotifications().subscribe(notifications => {
    //     this.toasts = notifications;
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  getToastClasses(toast: Toast): string {
    const baseClasses = 'border-l-4';
    const typeClasses = {
      success: 'border-green-500 bg-green-50',
      error: 'border-red-500 bg-red-50',
      warning: 'border-yellow-500 bg-yellow-50',
      info: 'border-blue-500 bg-blue-50'
    };
    return `${baseClasses} ${typeClasses[toast.type]}`;
  }

  getIconClasses(type: string): string {
    const classes = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    return classes[type as keyof typeof classes];
  }

  getIcon(type: string): string {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[type as keyof typeof icons];
  }

  getProgressBarClass(type: string): string {
    const classes = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    return classes[type as keyof typeof classes];
  }

  trackToast(index: number, toast: Toast): string {
    return toast.id;
  }
}
