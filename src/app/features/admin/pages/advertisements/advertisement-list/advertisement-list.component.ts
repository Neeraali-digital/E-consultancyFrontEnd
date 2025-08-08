import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../shared/services/api.service';

export interface Advertisement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  image: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Advertisements</h1>
        <button (click)="addAdvertisement()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Advertisement
        </button>
      </div>
    </div>

    <div *ngIf="isLoading" class="text-center py-8">Loading...</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let ad of advertisements" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="relative h-48">
          <img [src]="ad.image" [alt]="ad.title" class="w-full h-full object-cover">
          <div class="absolute top-2 right-2">
            <span class="px-2 py-1 text-xs font-medium rounded-full"
                  [class.bg-green-100]="ad.is_active"
                  [class.text-green-800]="ad.is_active"
                  [class.bg-red-100]="!ad.is_active"
                  [class.text-red-800]="!ad.is_active">
              {{ ad.is_active ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="font-bold text-lg text-gray-900 mb-2">{{ ad.title }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ ad.subtitle }}</p>
          <p class="text-gray-500 text-xs mb-4 line-clamp-2">{{ ad.description }}</p>
          
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-400">Order: {{ ad.order }}</span>
            <div class="flex gap-2">
              <button (click)="editAdvertisement(ad)" class="text-blue-600 hover:text-blue-800">
                <span class="material-icons text-sm">edit</span>
              </button>
              <button (click)="toggleStatus(ad)" class="text-orange-600 hover:text-orange-800">
                <span class="material-icons text-sm">{{ ad.is_active ? 'visibility_off' : 'visibility' }}</span>
              </button>
              <button (click)="deleteAdvertisement(ad)" class="text-red-600 hover:text-red-800">
                <span class="material-icons text-sm">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdvertisementListComponent implements OnInit, OnDestroy {
  advertisements: Advertisement[] = [];
  isLoading = true;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAdvertisements(): void {
    this.isLoading = true;
    const sub = this.apiService.get<any>('/advertisements/').subscribe({
      next: (response: any) => {
        this.advertisements = response.results || response || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading advertisements:', error);
        this.advertisements = [];
        this.isLoading = false;
      }
    });
    this.subscription.add(sub);
  }

  addAdvertisement(): void {
    this.router.navigate(['/admin/advertisements/add']);
  }

  editAdvertisement(ad: Advertisement): void {
    this.router.navigate(['/admin/advertisements/edit', ad.id]);
  }

  toggleStatus(ad: Advertisement): void {
    const sub = this.apiService.put(`/advertisements/${ad.id}/`, { ...ad, is_active: !ad.is_active }).subscribe({
      next: () => {
        ad.is_active = !ad.is_active;
      },
      error: (error: any) => {
        console.error('Error updating advertisement status:', error);
      }
    });
    this.subscription.add(sub);
  }

  deleteAdvertisement(ad: Advertisement): void {
    if (confirm(`Are you sure you want to delete "${ad.title}"?`)) {
      const sub = this.apiService.delete(`/advertisements/${ad.id}/`).subscribe({
        next: () => {
          this.advertisements = this.advertisements.filter(a => a.id !== ad.id);
        },
        error: (error: any) => {
          console.error('Error deleting advertisement:', error);
        }
      });
      this.subscription.add(sub);
    }
  }
}