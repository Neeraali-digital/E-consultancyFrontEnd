import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  expandedFaq: number | null = null;

  faqCategories = [
    {
      title: 'General Information',
      icon: 'info',
      color: 'blue',
      faqs: [
        {
          question: 'What is Wayzon Educational Consultancy?',
          answer: 'Wayzon is a trusted educational consultancy established in 2003, providing comprehensive guidance for admissions, career counseling, and educational planning across India and abroad.'
        },
        {
          question: 'How long has Wayzon been in operation?',
          answer: 'We have been serving students for over 20 years since our establishment in 2003, helping thousands of students achieve their educational goals.'
        },
        {
          question: 'What services does Wayzon offer?',
          answer: 'We offer career counseling, admission guidance, local guardian services, campus visits, education loan assistance, and study abroad programs.'
        }
      ]
    },
    {
      title: 'Admissions & Courses',
      icon: 'school',
      color: 'green',
      faqs: [
        {
          question: 'Which courses do you provide guidance for?',
          answer: 'We provide guidance for MBBS, Engineering, MBA, BDS, Pharmacy, Nursing, and various other undergraduate and postgraduate programs.'
        },
        {
          question: 'Do you help with entrance exam preparation?',
          answer: 'Yes, we provide guidance and resources for various entrance exams including NEET, JEE, CAT, and other competitive examinations.'
        },
        {
          question: 'Can you guarantee admission to my preferred college?',
          answer: 'While we cannot guarantee admissions, our expert guidance and strong network significantly improve your chances of securing admission to top institutions.'
        }
      ]
    },
    {
      title: 'Study Abroad',
      icon: 'public',
      color: 'purple',
      faqs: [
        {
          question: 'Which countries do you provide guidance for?',
          answer: 'We specialize in Georgia, Russia, Armenia, Uzbekistan, Kazakhstan, and other popular study destinations for Indian students.'
        },
        {
          question: 'What is the process for studying abroad?',
          answer: 'The process includes country selection, university shortlisting, application submission, visa processing, and pre-departure guidance.'
        },
        {
          question: 'Do you provide visa assistance?',
          answer: 'Yes, we provide complete visa assistance including document preparation, application submission, and interview preparation.'
        }
      ]
    },
    {
      title: 'Fees & Financial Support',
      icon: 'account_balance',
      color: 'orange',
      faqs: [
        {
          question: 'What are your consultation fees?',
          answer: 'Our consultation fees vary based on the service. We offer free initial consultations to understand your requirements.'
        },
        {
          question: 'Do you help with education loans?',
          answer: 'Yes, we assist with education loan applications, documentation, and liaison with banks to secure the best loan terms.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No, we maintain complete transparency in our fee structure. All charges are discussed upfront with no hidden costs.'
        }
      ]
    }
  ];

  toggleFaq(categoryIndex: number, faqIndex: number): void {
    const uniqueId = categoryIndex * 100 + faqIndex;
    this.expandedFaq = this.expandedFaq === uniqueId ? null : uniqueId;
  }

  isFaqExpanded(categoryIndex: number, faqIndex: number): boolean {
    const uniqueId = categoryIndex * 100 + faqIndex;
    return this.expandedFaq === uniqueId;
  }
}
