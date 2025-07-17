import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-franchise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.css']
})
export class FranchiseComponent {

  franchiseModels = [
    {
      title: 'Standard Franchise',
      investment: '₹5-10 Lakhs',
      area: '500-1000 sq ft',
      support: 'Basic',
      features: [
        'Brand licensing rights',
        'Initial training program',
        'Marketing materials',
        'Basic operational support',
        'Student database access'
      ],
      ideal: 'Small cities and towns',
      roi: '25-30%',
      color: 'blue'
    },
    {
      title: 'Premium Franchise',
      investment: '₹10-20 Lakhs',
      area: '1000-2000 sq ft',
      support: 'Comprehensive',
      features: [
        'Exclusive territory rights',
        'Advanced training program',
        'Complete marketing support',
        'Dedicated relationship manager',
        'Technology platform access',
        'Regular performance reviews'
      ],
      ideal: 'Tier 2 cities',
      roi: '30-35%',
      color: 'green'
    },
    {
      title: 'Master Franchise',
      investment: '₹20-50 Lakhs',
      area: '2000+ sq ft',
      support: 'Full Support',
      features: [
        'Regional master rights',
        'Sub-franchise opportunities',
        'Complete business setup',
        'Ongoing operational support',
        'Advanced technology suite',
        'Marketing campaign support',
        'Regular business reviews'
      ],
      ideal: 'Metro cities',
      roi: '35-40%',
      color: 'purple'
    }
  ];

  benefits = [
    {
      title: 'Established Brand',
      description: 'Leverage 20+ years of trust and reputation in educational consultancy',
      icon: 'verified'
    },
    {
      title: 'Proven Business Model',
      description: 'Time-tested processes and systems for consistent growth',
      icon: 'trending_up'
    },
    {
      title: 'Comprehensive Training',
      description: 'Complete training on operations, sales, and customer service',
      icon: 'school'
    },
    {
      title: 'Marketing Support',
      description: 'National and local marketing campaigns to drive business',
      icon: 'campaign'
    },
    {
      title: 'Technology Platform',
      description: 'Advanced CRM and management systems for efficient operations',
      icon: 'computer'
    },
    {
      title: 'Ongoing Support',
      description: 'Continuous guidance and support from experienced team',
      icon: 'support_agent'
    }
  ];

  requirements = [
    'Minimum educational qualification: Graduate',
    'Business experience preferred but not mandatory',
    'Passion for education and helping students',
    'Financial capability as per franchise model',
    'Suitable location in target market',
    'Commitment to brand values and standards'
  ];

  process = [
    {
      step: 1,
      title: 'Initial Inquiry',
      description: 'Submit your franchise application with basic details',
      icon: 'contact_mail'
    },
    {
      step: 2,
      title: 'Evaluation',
      description: 'Our team evaluates your application and conducts initial screening',
      icon: 'assessment'
    },
    {
      step: 3,
      title: 'Meeting',
      description: 'Face-to-face or virtual meeting to discuss opportunities',
      icon: 'video_call'
    },
    {
      step: 4,
      title: 'Documentation',
      description: 'Complete legal documentation and franchise agreement',
      icon: 'description'
    },
    {
      step: 5,
      title: 'Training',
      description: 'Comprehensive training program for you and your team',
      icon: 'school'
    },
    {
      step: 6,
      title: 'Launch',
      description: 'Grand opening with full marketing and operational support',
      icon: 'rocket_launch'
    }
  ];

  testimonials = [
    {
      name: 'Rajesh Sharma',
      location: 'Jaipur, Rajasthan',
      franchise: 'Premium Franchise',
      testimonial: 'Joining Wayzon was the best business decision I made. The support and guidance helped me build a successful consultancy.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 5
    },
    {
      name: 'Priya Patel',
      location: 'Ahmedabad, Gujarat',
      franchise: 'Standard Franchise',
      testimonial: 'The training and ongoing support from Wayzon team has been exceptional. My business is growing steadily.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 5
    },
    {
      name: 'Vikram Singh',
      location: 'Lucknow, UP',
      franchise: 'Master Franchise',
      testimonial: 'Wayzon\'s proven business model and brand reputation helped me establish a strong presence in my region.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5
    }
  ];

  selectedModel: any = null;

  selectModel(model: any): void {
    this.selectedModel = this.selectedModel === model ? null : model;
  }

  generateStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
