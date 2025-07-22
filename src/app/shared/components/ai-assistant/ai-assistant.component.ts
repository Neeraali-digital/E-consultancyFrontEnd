import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
  suggestions?: string[];
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50" [@slideIn]>
      <!-- Chat Toggle Button -->
      <button 
        *ngIf="!isOpen"
        (click)="toggleChat()"
        class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden">
        
        <!-- Pulse Animation -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-20"></div>
        
        <!-- AI Brain Animation -->
        <div class="relative z-10 flex items-center justify-center">
          <div class="w-8 h-8 relative">
            <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <span class="material-icons text-2xl relative z-10 group-hover:animate-bounce">psychology</span>
          </div>
        </div>
        
        <!-- Notification Badge -->
        <div *ngIf="unreadCount > 0" 
             class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
          {{ unreadCount }}
        </div>
      </button>

      <!-- Chat Window -->
      <div *ngIf="isOpen" 
           class="w-96 h-[32rem] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
           [@expandChat]>
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
              <span class="material-icons text-white">psychology</span>
              <div class="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 class="text-white font-bold">AI Assistant</h3>
              <p class="text-purple-100 text-xs">{{ isTyping ? 'Typing...' : 'Online' }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button (click)="clearChat()" 
                    class="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    title="Clear Chat">
              <span class="material-icons text-white text-sm">refresh</span>
            </button>
            <button (click)="toggleChat()" 
                    class="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <span class="material-icons text-white">close</span>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div #messagesContainer 
             class="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
          
          <div *ngFor="let message of messages; trackBy: trackMessage" 
               class="flex" 
               [class.justify-end]="message.isUser"
               [@messageSlide]>
            
            <div class="max-w-[80%] flex items-start space-x-2"
                 [class.flex-row-reverse]="message.isUser"
                 [class.space-x-reverse]="message.isUser">
              
              <!-- Avatar -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                   [class.bg-gradient-to-r]="!message.isUser"
                   [class.from-purple-500]="!message.isUser"
                   [class.to-pink-500]="!message.isUser"
                   [class.bg-blue-500]="message.isUser">
                <span class="material-icons text-white text-sm">
                  {{ message.isUser ? 'person' : 'psychology' }}
                </span>
              </div>
              
              <!-- Message Bubble -->
              <div class="relative">
                <div class="px-4 py-3 rounded-2xl shadow-lg"
                     [class.bg-gradient-to-r]="message.isUser"
                     [class.from-blue-500]="message.isUser"
                     [class.to-blue-600]="message.isUser"
                     [class.text-white]="message.isUser"
                     [class.bg-white]="!message.isUser"
                     [class.text-gray-800]="!message.isUser"
                     [class.border]="!message.isUser"
                     [class.border-gray-200]="!message.isUser">
                  
                  <!-- Typing Animation -->
                  <div *ngIf="message.typing" class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                  
                  <!-- Message Text -->
                  <p *ngIf="!message.typing" class="text-sm leading-relaxed">{{ message.text }}</p>
                </div>
                
                <!-- Suggestions -->
                <div *ngIf="message.suggestions && message.suggestions.length > 0" 
                     class="mt-2 space-y-1">
                  <button *ngFor="let suggestion of message.suggestions"
                          (click)="sendMessage(suggestion)"
                          class="block w-full text-left px-3 py-2 text-xs bg-white/80 hover:bg-white border border-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900">
                    {{ suggestion }}
                  </button>
                </div>
                
                <!-- Timestamp -->
                <div class="text-xs text-gray-400 mt-1"
                     [class.text-right]="message.isUser">
                  {{ message.timestamp | date:'shortTime' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <div class="flex items-center space-x-2">
            <div class="flex-1 relative">
              <input 
                #messageInput
                [(ngModel)]="currentMessage"
                (keydown.enter)="sendMessage()"
                [disabled]="isTyping"
                placeholder="Ask me anything..."
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200 text-sm">
              
              <!-- Voice Input Button -->
              <button class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                <span class="material-icons text-gray-500 text-sm">mic</span>
              </button>
            </div>
            
            <button 
              (click)="sendMessage()"
              [disabled]="!currentMessage.trim() || isTyping"
              class="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
              <span class="material-icons text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('expandChat', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ]),
    trigger('messageSlide', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AiAssistantComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  isOpen = false;
  currentMessage = '';
  isTyping = false;
  unreadCount = 0;
  
  messages: Message[] = [
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. I can help you with analytics, insights, and answer questions about your admin dashboard. How can I assist you today?',
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        'Show me today\'s analytics',
        'What are the top performing colleges?',
        'Generate a report',
        'Help with course management'
      ]
    }
  ];

  private aiResponses = [
    'Based on your data, I can see some interesting trends...',
    'Let me analyze that for you...',
    'Here\'s what I found in your dashboard data...',
    'I\'ve processed your request. Here are the insights...',
    'Great question! Let me help you with that...',
    'I\'ve analyzed the patterns and here\'s my recommendation...'
  ];

  ngOnInit(): void {
    // Simulate initial notification
    setTimeout(() => {
      if (!this.isOpen) {
        this.unreadCount = 1;
      }
    }, 3000);
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 300);
    }
  }

  sendMessage(message?: string): void {
    const text = message || this.currentMessage.trim();
    if (!text || this.isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    this.messages.push(userMessage);
    this.currentMessage = '';
    this.scrollToBottom();

    // Show typing indicator
    this.isTyping = true;
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      isUser: false,
      timestamp: new Date(),
      typing: true
    };
    
    this.messages.push(typingMessage);
    this.scrollToBottom();

    // Simulate AI response
    setTimeout(() => {
      this.messages = this.messages.filter(m => m.id !== 'typing');
      
      const aiResponse: Message = {
        id: Date.now().toString(),
        text: this.generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
        suggestions: this.generateSuggestions(text)
      };
      
      this.messages.push(aiResponse);
      this.isTyping = false;
      this.scrollToBottom();
    }, 1500 + Math.random() * 1000);
  }

  clearChat(): void {
    this.messages = [this.messages[0]]; // Keep welcome message
  }

  private generateAIResponse(userMessage: string): string {
    const responses = this.aiResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateSuggestions(userMessage: string): string[] {
    const allSuggestions = [
      'Show analytics dashboard',
      'Export data report',
      'View recent activities',
      'Check system status',
      'Manage user permissions',
      'Generate insights'
    ];
    
    return allSuggestions.slice(0, 3);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  trackMessage(index: number, message: Message): string {
    return message.id;
  }
}
