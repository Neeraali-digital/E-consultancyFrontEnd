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

  faqs = [
    {
      question: 'Why Choose Admission Through a Professional Education Consultancy?',
      answer: 'Professional education consultancies like Wayzon Education offer expert guidance, simplifying the complex admission process. They provide personalized counseling, help in selecting suitable courses and colleges, assist with application procedures, and offer insights into entrance exams and scholarship opportunities, saving you time and reducing stress.',
      isExpanded: true
    },
    {
      question: 'How do I choose the right education consultancy?',
      answer: 'Look for a consultancy with a strong track record, experienced counselors, and comprehensive services. Verify their affiliations and success stories. Transparency in their process, ethical practices, and personalized attention are key indicators of a reliable education consultancy.',
      isExpanded: true
    },
    {
      question: 'What services do consultancies offer to students?',
      answer: 'Consultancies typically offer a range of services including career counseling, course and college selection, application assistance, entrance exam preparation guidance, scholarship information, education loan support, visa assistance (for international studies), and post-admission support.',
      isExpanded: true
    },
    {
      question: 'Is it legal to admit students through the management quota for professional courses?',
      answer: 'Yes, admission through the management quota for professional courses is legal in India, provided it adheres to the regulations set by the respective state governments and regulatory bodies like AICTE or MCI. Colleges are allowed to reserve a certain percentage of seats under this quota.',
      isExpanded: true
    },
    {
      question: 'Is help from an educational consultancy required to get admission to a good college?',
      answer: 'While not strictly "required," an educational consultancy significantly increases your chances of getting into a good college. They possess in-depth knowledge of admission criteria, application deadlines, and hidden opportunities, providing a strategic advantage. For specialized or highly competitive programs, their expertise can be invaluable.',
      isExpanded: true
    },
    {
      question: 'Can Wayzon Education guarantee admission to your preferred college?',
      answer: 'Wayzon Education strives to maximize your chances of admission to your preferred colleges through meticulous application guidance, profile building, and strategic advice. While we cannot guarantee admission (as the final decision rests with the institutions), our expertise significantly enhances your prospects, and we work tirelessly to find the best possible fit for your academic profile and aspirations.',
      isExpanded: true
    },
    {
      question: 'Can education consultancies help with scholarship and education loan?',
      answer: 'Absolutely. Reputable education consultancies often have extensive information on various scholarship programs (government, private, and institutional) and can guide you through the application process. They also assist in connecting students with financial institutions for education loans, helping them understand eligibility criteria and documentation requirements.',
      isExpanded: true
    }
  ];

  toggleExpansion(index: number): void {
    this.faqs[index].isExpanded = !this.faqs[index].isExpanded;
  }
}
