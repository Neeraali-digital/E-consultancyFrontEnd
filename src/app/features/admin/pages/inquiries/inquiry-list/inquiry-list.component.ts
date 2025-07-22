import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inquiry-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p class="mt-2 text-gray-600">Manage student inquiries and support requests</p>
        </div>
        <div class="mt-4 sm:mt-0 flex items-center space-x-2">
          <span class="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            12 Pending
          </span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Inquiry Management</h2>
      <p class="text-gray-600">Inquiry management functionality will be implemented here.</p>
    </div>
  `
})
export class InquiryListComponent {
  
}
