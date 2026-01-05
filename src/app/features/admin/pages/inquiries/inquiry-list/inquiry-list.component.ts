import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../../shared/services/api.service';

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
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {{ inquiries.length }} Inquiries
          </span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button 
          (click)="switchTab('standard')"
          [class.border-indigo-500]="activeTab === 'standard'"
          [class.text-indigo-600]="activeTab === 'standard'"
          [class.border-transparent]="activeTab !== 'standard'"
          [class.text-gray-500]="activeTab !== 'standard'"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:text-gray-700 hover:border-gray-300 transition-colors">
          Standard Inquiries
        </button>
        <button 
          (click)="switchTab('quick')"
          [class.border-indigo-500]="activeTab === 'quick'"
          [class.text-indigo-600]="activeTab === 'quick'"
          [class.border-transparent]="activeTab !== 'quick'"
          [class.text-gray-500]="activeTab !== 'quick'"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:text-gray-700 hover:border-gray-300 transition-colors">
          Quick Inquiries
        </button>
      </nav>
    </div>

    <!-- Loading State -->
    <div *ngIf="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Data Table -->
    <div *ngIf="!isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let inquiry of inquiries" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ inquiry.created_at | date:'mediumDate' }}
                <div class="text-xs text-gray-400">{{ inquiry.created_at | date:'shortTime' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                    {{ inquiry.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ inquiry.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ inquiry.email }}</div>
                <div class="text-sm text-gray-500">{{ inquiry.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ inquiry.course_of_interest || 'N/A' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" [title]="inquiry.message">
                {{ inquiry.message || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button (click)="viewInquiry(inquiry)" class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors">
                  View
                </button>
              </td>
            </tr>
            <tr *ngIf="inquiries.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <span class="material-icons text-4xl text-gray-300 mb-2">inbox</span>
                <p>No {{ activeTab === 'quick' ? 'quick' : 'standard' }} inquiries found.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Details Modal -->
    <div *ngIf="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" (click)="closeModal()" aria-hidden="true"></div>

        <!-- Center modal -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <span class="material-icons text-indigo-600">contact_support</span>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ activeTab === 'quick' ? 'Quick Inquiry Details' : 'Standard Inquiry Details' }}
                </h3>
                <div class="mt-4 space-y-4">
                  <!-- Name & Date -->
                  <div class="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div>
                        <div class="text-sm text-gray-500">Applicant Name</div>
                        <div class="font-medium text-gray-900">{{ selectedInquiry?.name }}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Date</div>
                        <div class="text-sm font-medium text-gray-900">{{ selectedInquiry?.created_at | date:'mediumDate' }}</div>
                        <div class="text-xs text-gray-400">{{ selectedInquiry?.created_at | date:'shortTime' }}</div>
                    </div>
                  </div>

                  <!-- Contact Info -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="overflow-hidden">
                          <div class="text-sm text-gray-500">Email</div>
                          <div class="text-gray-900 break-all">{{ selectedInquiry?.email }}</div>
                      </div>
                      <div>
                          <div class="text-sm text-gray-500">Phone</div>
                          <div class="text-gray-900">{{ selectedInquiry?.phone }}</div>
                      </div>
                  </div>

                  <!-- Course -->
                  <div>
                      <div class="text-sm text-gray-500">Course of Interest</div>
                      <div class="text-lg font-medium text-blue-600">{{ selectedInquiry?.course_of_interest || 'Not Specified' }}</div>
                  </div>

                  <!-- Message -->
                  <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div class="text-sm text-gray-500 mb-1">Message</div>
                      <div class="text-gray-700 whitespace-pre-wrap">{{ selectedInquiry?.message || 'No message provided.' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" (click)="closeModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InquiryListComponent implements OnInit {
  inquiries: any[] = [];
  isLoading = true;
  selectedInquiry: any = null;
  isModalOpen = false;
  activeTab: 'standard' | 'quick' = 'standard';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadInquiries();
  }

  switchTab(tab: 'standard' | 'quick') {
    this.activeTab = tab;
    this.loadInquiries();
  }

  loadInquiries() {
    this.isLoading = true;
    this.apiService.getInquiries({ type: this.activeTab }).subscribe({
      next: (data) => {
        // Handle paginated response which contains a 'results' array
        this.inquiries = data.results || data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load inquiries', err);
        this.isLoading = false;
      }
    });
  }

  viewInquiry(inquiry: any) {
    this.selectedInquiry = inquiry;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedInquiry = null;
  }
}
