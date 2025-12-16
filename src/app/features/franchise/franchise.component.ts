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
  selectedModel: any = null;
  showModal = false;

  franchiseModels = [
    {
      title:'Domestic Education Franchise',
      description: 'We are offering franchise opportunities for individuals or agencies interested in student admissions to reputed and top institutions across Karnataka. We are also inviting students and consultancy franchises from across India to join us. Our consultancy has direct tie-ups and formal agreements with over 100 institutions offering a wide range of courses. <br><br> As a franchise partner or sub-consultant, marketing becomes easy because our representatives are directly associated with colleges as administrative liaisons. Each franchisee will also receive dedicated full-time support from our team for all activities, including student counseling, payment processing, collections, and payouts.',
      color: 'blue'
    },
    {
      title: 'Abroad Education Franchise',
      description: 'We have been a strong and trustworthy name in overseas admissions for over two decades, particularly in MBBS programs offering affordable fee structures and placements at highly reputed institutions. Our consultancy holds exclusive agreements with several leading universities, ensuring genuine and direct admissions. <br><br> We already have successful partnerships with many overseas education consultants and are now expanding our franchise network. Our dedicated and experienced team provides complete support for the application process, documentation, and student assistance  making it easy for our partners to deliver smooth and successful admissions. <br><br> As a well-recognized and trusted brand in the education sector, our strong reputation helps franchise partners close deals more easily and achieve higher conversion rates. Additionally, we offer our sub-consultants the exclusive opportunity to visit our partner universities abroad, gaining firsthand experience and confidence in promoting our programs. <br><br> We also ensure better payouts and attractive incentives for our franchise partners.',
      color: 'green'
    },
    {
      title: 'India & Overseas Franchise',
      description: 'We are offering franchise opportunities for experienced consultants in the education consultancy domain, both in India and abroad. <br><br> For domestic operations, we are Karnataka-based and represent top institutions offering professional courses across various fields. For the overseas segment, we specialize exclusively in MBBS admissions in select countries. <br><br> Each division—domestic and international—will have dedicated support teams from our headquarters to assist franchise partners. We will provide regular training, updates, marketing assistance, and lead generation support to help you grow your business effectively. <br><br> Separate staff will be required from the franchisee’s side for each department to ensure smooth and specialized operations.',
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

  openModal(model: any) {
    this.selectedModel = model;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedModel = null;
  }
}
