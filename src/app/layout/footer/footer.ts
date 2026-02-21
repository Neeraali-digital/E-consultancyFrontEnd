import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();

  // Company Information
  companyInfo = {
    name: 'WAYZON',
    tagline: 'TRUSTED EDUCATIONAL CONSULTANCY SINCE 2003',
    description: 'Your trusted partner in educational excellence. We provide comprehensive guidance for admissions, career counseling, and educational planning.',
    email: 'Info@wayzoneducation.com',
    phone: '+91 99804 87777',
    whatsapp: '+91 90355 11111',
    address: {
      line1: 'Wayzon Education',
      line2: 'Manyata Tech Park, MFAR, 4th Floor, Nagawara, Hebbal',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560045',
      country: 'India'
    }
  };

  // Quick Links
  quickLinks = [
    { name: 'Home', route: '/home', icon: 'home' },
    { name: 'About Us', route: '/about', icon: 'info' },
    { name: 'Courses', route: '/courses', icon: 'school' },
    { name: 'Services', route: '/services', icon: 'support_agent' },
    { name: 'Colleges', route: '/colleges', icon: 'account_balance' },
    { name: 'Contact', route: '/contact', icon: 'contact_mail' }
  ];

  // Services
  services = [
    { name: 'Direct Admission', route: '/services', icon: 'how_to_reg' },
    { name: 'Career Counseling', route: '/services', icon: 'psychology' },
    { name: 'Scholarship Assistance', route: '/services', icon: 'monetization_on' },
    { name: 'Document Verification', route: '/services', icon: 'verified' },
    { name: 'Entrance Exam Prep', route: '/services', icon: 'quiz' },
    { name: 'Visa & Immigration', route: '/services', icon: 'flight_takeoff' }
  ];

  // Popular Courses
  popularCourses = [
    { name: 'Engineering (B.Tech)', route: '/courses', icon: 'engineering' },
    { name: 'Medical (MBBS)', route: '/courses', icon: 'medical_services' },
    { name: 'Management (MBA)', route: '/courses', icon: 'business_center' },
    { name: 'Technology (MCA)', route: '/courses', icon: 'computer' },
    { name: 'Arts & Science', route: '/courses', icon: 'auto_stories' },
    { name: 'Commerce (B.Com)', route: '/courses', icon: 'account_balance_wallet' }
  ];

  // Social Media Links
  socialMedia = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/wayzon_education_pvt.ltd?igsh=ZGg2Z3JwbWZheGVk',
      isSvg: true,
      color: '#E4405F',
      svgPath: 'M7.818 2H16.182C19.458 2 22 4.542 22 7.818V16.182C22 19.458 19.458 22 16.182 22H7.818C4.542 22 2 19.458 2 16.182V7.818C2 4.542 4.542 2 7.818 2ZM12 7.5C9.514 7.5 7.5 9.514 7.5 12C7.5 14.486 9.514 16.5 12 16.5C14.486 16.5 16.5 14.486 16.5 12C16.5 9.514 14.486 7.5 12 7.5ZM19 7C18.448 7 18 6.552 18 6C18 5.448 18.448 5 19 5C19.552 5 20 5.448 20 6C20 6.552 19.552 7 19 7ZM12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9Z'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@wayzoneducation7294?si=sJZ_FBL87GpWRhVY',
      isSvg: true,
      color: '#FF0000',
      svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1BpRrZ6Fe8/?mibextid=wwXIfr',
      icon: 'facebook',
      color: '#1877F2'
    }
  ];

  // Office Locations
  offices = [
    {
      city: 'Bangalore',
      type: 'Head Office',
      address: 'Wayzon Education, Manyata Tech Park, MFAR, 4th Floor, Nagawara, Hebbal, Bengaluru - 560045',
      phone: '+91 99804 87777',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM'
    },
    {
      city: 'Kochi',
      type: 'Branch Office',
      address: 'Wayzon Education Consultancy, 8th Floor, Lanarth Elite, MG Road, Near Maharajas Metro, Kochi - 682011',
      phone: '+91 99804 87777',
      email: 'Info@wayzoneducation.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM'
    }
  ];

  // Legal Links
  legalLinks = [
    { name: 'Privacy Policy', route: '/privacy-policy' },
    { name: 'Terms of Service', route: '/terms-of-service' },
    { name: 'Refund Policy', route: '/refund-policy' },
    { name: 'Disclaimer', route: '/disclaimer' },
    { name: 'Cookie Policy', route: '/cookie-policy' }
  ];

  // Statistics
  stats = [
    { number: '20+', label: 'Years Experience', icon: 'schedule' },
    { number: '10,000+', label: 'Happy Students', icon: 'people' },
    { number: '500+', label: 'Partner Colleges', icon: 'account_balance' },
    { number: '95%', label: 'Success Rate', icon: 'trending_up' }
  ];

  // Newsletter subscription
  subscribeToNewsletter(email: string): void {
    if (email && email.includes('@')) {
      // Implement newsletter subscription logic here
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address.');
    }
  }

  // Social media click handler
  openSocialMedia(url: string): void {
    window.open(url, '_blank');
  }

  // Phone call handler
  makeCall(phone: string): void {
    window.open(`tel:${phone}`);
  }

  // Email handler
  sendEmail(email: string): void {
    window.open(`mailto:${email}`);
  }

  // WhatsApp handler
  openWhatsApp(phone: string): void {
    const message = encodeURIComponent('Hi! I would like to know more about your educational services.');
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  }

  // Scroll to top handler
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}