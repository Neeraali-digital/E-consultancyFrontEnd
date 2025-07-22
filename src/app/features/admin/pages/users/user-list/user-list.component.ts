import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Users</h1>
          <p class="mt-2 text-gray-600">Manage user accounts and permissions</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <a routerLink="/admin/users/add" 
             class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <span class="material-icons text-sm mr-2">add</span>
            Add New User
          </a>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
      <p class="text-gray-600">User CRUD functionality will be implemented here.</p>
    </div>
  `
})
export class UserListComponent {
  
}
