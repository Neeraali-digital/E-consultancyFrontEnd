import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
  is_active: boolean;
  profile_image?: string;
  date_joined: Date;
  last_login?: Date;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <button (click)="addUser()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add User
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search users..." 
               class="border rounded-lg px-3 py-2">
        <select [(ngModel)]="selectedRole" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>
        <select [(ngModel)]="selectedStatus" (change)="onFilterChange()" class="border rounded-lg px-3 py-2">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    </div>

    <div *ngIf="isLoading" class="text-center py-8">Loading...</div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr *ngFor="let user of getPaginatedUsers()">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img *ngIf="user.profile_image" [src]="user.profile_image" alt="{{ user.first_name }}" 
                     class="w-10 h-10 rounded-full mr-3">
                <div *ngIf="!user.profile_image" class="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  <span class="text-gray-600 font-medium">{{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ user.first_name }} {{ user.last_name }}</div>
                  <div class="text-sm text-gray-500">{{ user.phone || 'No phone' }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                    [class.bg-purple-100]="user.role === 'admin'"
                    [class.text-purple-800]="user.role === 'admin'"
                    [class.bg-blue-100]="user.role === 'staff'"
                    [class.text-blue-800]="user.role === 'staff'"
                    [class.bg-green-100]="user.role === 'student'"
                    [class.text-green-800]="user.role === 'student'">
                {{ user.role | titlecase }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                    [class.bg-green-100]="user.is_active"
                    [class.text-green-800]="user.is_active"
                    [class.bg-red-100]="!user.is_active"
                    [class.text-red-800]="!user.is_active">
                {{ user.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.date_joined | date:'short' }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button (click)="editUser(user)" class="text-blue-600 hover:text-blue-800">
                  <span class="material-icons text-sm">edit</span>
                </button>
                <button (click)="toggleStatus(user)" class="text-orange-600 hover:text-orange-800">
                  <span class="material-icons text-sm">{{ user.is_active ? 'visibility_off' : 'visibility' }}</span>
                </button>
                <button (click)="deleteUser(user)" class="text-red-600 hover:text-red-800">
                  <span class="material-icons text-sm">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = true;
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 10;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUsers(): void {
    this.isLoading = true;
    
    const sub = this.http.get<any>(`${API_URL}/users/`).subscribe({
      next: (response: any) => {
        this.users = response.results || response || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
        this.users = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm ||
        user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || user.is_active.toString() === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  addUser(): void {
    this.router.navigate(['/admin/users/add']);
  }

  editUser(user: User): void {
    this.router.navigate(['/admin/users/edit', user.id]);
  }

  toggleStatus(user: User): void {
    const newStatus = !user.is_active;
    
    const sub = this.http.patch(`${API_URL}/users/${user.id}/`, { is_active: newStatus }).subscribe({
      next: (updatedUser: any) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.applyFilters();
        }
        console.log('User status updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating user status');
      }
    });
    
    this.subscription.add(sub);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete "${user.first_name} ${user.last_name}"?`)) {
      const sub = this.http.delete(`${API_URL}/users/${user.id}/`).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.applyFilters();
          console.log('User deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting user');
        }
      });
      
      this.subscription.add(sub);
    }
  }
}