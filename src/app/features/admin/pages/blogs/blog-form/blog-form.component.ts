import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Add/Edit Blog</h1>
          <p class="mt-2 text-gray-600">Create or update blog post</p>
        </div>
        <button routerLink="/admin/blogs"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <span class="material-icons text-sm mr-2">arrow_back</span>
          Back to List
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Blog Form</h2>
      <p class="text-gray-600">Blog form functionality will be implemented here.</p>
    </div>
  `
})
export class BlogFormComponent {
  
}
