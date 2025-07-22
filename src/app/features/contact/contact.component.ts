import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = {
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    preferredTime: ''
  };

  offices = [
    {
      city: 'Bangalore',
      address: '123 MG Road, Bangalore - 560001',
      phone: '+91 99804 87777',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isMain: true
    },
    {
      city: 'Delhi',
      address: '456 Connaught Place, New Delhi - 110001',
      phone: '+91 97405 68888',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isMain: false
    },
    {
      city: 'Mumbai',
      address: '789 Bandra West, Mumbai - 400050',
      phone: '+91 99804 87777',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isMain: false
    },
    {
      city: 'Chennai',
      address: '321 T. Nagar, Chennai - 600017',
      phone: '+91 97405 68888',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isMain: false
    }
  ];

  faqs = [
    {
      question: 'How does direct admission work?',
      answer: 'Direct admission allows you to secure a seat in top colleges without appearing for entrance exams. We have partnerships with various colleges that offer management quota seats.',
      isOpen: false
    },
    {
      question: 'What is the success rate of admissions?',
      answer: 'We have a 95% success rate in securing admissions for our students. Our experienced team ensures the best possible outcomes.',
      isOpen: false
    },
    {
      question: 'Do you provide scholarship assistance?',
      answer: 'Yes, we help students identify and apply for various scholarships, including merit-based, need-based, and government scholarships.',
      isOpen: false
    },
    {
      question: 'What are your consultation charges?',
      answer: 'We offer free initial consultation. Our detailed counseling packages are reasonably priced and vary based on the services required.',
      isOpen: false
    },
    {
      question: 'How long does the admission process take?',
      answer: 'The admission process typically takes 2-4 weeks, depending on the college and course. We ensure quick processing of all applications.',
      isOpen: false
    }
  ];

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Form submitted:', this.contactForm);
    // Handle form submission logic here
    alert('Thank you for your inquiry! We will contact you soon.');
    this.resetForm();
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
      preferredTime: ''
    };
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
