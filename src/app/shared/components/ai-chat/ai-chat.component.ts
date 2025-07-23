import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit {
  
  isOpen = false;
  isMinimized = false;
  currentMessage = '';
  isTyping = false;
  
  messages: ChatMessage[] = [
    {
      id: 1,
      text: "Hello! I'm WAYZON AI Assistant. How can I help you with your educational journey today? 🎓",
      isUser: false,
      timestamp: new Date()
    }
  ];

  // Predefined responses for demo
  aiResponses = [
    "That's a great question! Let me help you with that. WAYZON offers comprehensive guidance for engineering admissions.",
    "I'd be happy to assist you with medical college admissions. We have partnerships with top medical institutions.",
    "For MBA programs, WAYZON provides expert counseling and direct admission opportunities in premier business schools.",
    "Our experienced counselors can guide you through the entire admission process. Would you like to schedule a free consultation?",
    "WAYZON has helped over 10,000 students achieve their educational dreams since 2003. What specific course are you interested in?",
    "We offer personalized career counseling based on your interests and academic background. Let me know your preferences!",
    "Our success rate is 95% for college admissions. We work with top universities across India. What's your target college?",
    "I can help you understand eligibility criteria, application processes, and scholarship opportunities. What would you like to know?"
  ];

  constructor() { }

  ngOnInit(): void {
    // Auto-open chat after 5 seconds for demo
    setTimeout(() => {
      if (!this.isOpen) {
        this.showNotification();
      }
    }, 5000);
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isMinimized = false;
    }
  }

  minimizeChat() {
    this.isMinimized = !this.isMinimized;
  }

  closeChat() {
    this.isOpen = false;
    this.isMinimized = false;
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: this.messages.length + 1,
        text: this.currentMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      this.messages.push(userMessage);
      const userText = this.currentMessage;
      this.currentMessage = '';
      
      // Show typing indicator
      this.isTyping = true;
      
      // Simulate AI response after delay
      setTimeout(() => {
        this.isTyping = false;
        const aiResponse = this.generateAIResponse(userText);
        const aiMessage: ChatMessage = {
          id: this.messages.length + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        };
        this.messages.push(aiMessage);
        this.scrollToBottom();
      }, 1500);
      
      this.scrollToBottom();
    }
  }

  generateAIResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('engineering') || lowerMessage.includes('btech') || lowerMessage.includes('b.tech')) {
      return "Great choice! WAYZON has excellent partnerships with top engineering colleges including IITs, NITs, and premier private institutions. We offer direct admission opportunities and can guide you through JEE preparation. Would you like to know about specific branches or colleges?";
    }
    
    if (lowerMessage.includes('medical') || lowerMessage.includes('mbbs') || lowerMessage.includes('neet')) {
      return "Medical education is a noble path! We assist with MBBS, BDS, BAMS, and other medical courses. Our team helps with NEET counseling, direct admissions, and guidance for top medical colleges. What's your NEET score or target college?";
    }
    
    if (lowerMessage.includes('mba') || lowerMessage.includes('management') || lowerMessage.includes('business')) {
      return "MBA programs can transform your career! WAYZON provides guidance for IIMs, ISB, and top business schools. We help with CAT preparation, application processes, and scholarship opportunities. What specialization interests you?";
    }
    
    if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Our consultation is completely FREE! We believe in transparent pricing with no hidden costs. Our success fee is only charged after successful admission. Would you like to schedule a free counseling session?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
      return "You can reach us at +91 974056 8888 or email info@wayzon.edu. Our counselors are available 9 AM to 7 PM. Would you like me to schedule a callback for you?";
    }
    
    // Return random response if no specific match
    return this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
  }

  showNotification() {
    // Add a notification message
    const notification: ChatMessage = {
      id: this.messages.length + 1,
      text: "👋 Need help with college admissions? I'm here to assist you!",
      isUser: false,
      timestamp: new Date()
    };
    this.messages.push(notification);
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
