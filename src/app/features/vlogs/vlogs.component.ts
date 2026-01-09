import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vlogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vlogs.component.html',
  styleUrls: ['./vlogs.component.scss']
})
export class VlogsComponent {
  activeCategory = 'All';
  categories = ['All', 'Campus Tours', 'Student Life', 'Success Stories', 'Faculty Interviews', 'Events'];

  vlogs = [
    {
      title: "A Day in Life of a Medical Student at Tbilisi State Medical University",
      description: "Join us as we follow John Doe through his daily routine of classes, practicals, and exploring the beautiful city of Tbilisi.",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      duration: "12:45",
      category: "Student Life",
      views: "15K",
      author: "Wayzon Team",
      authorImage: "assets/images/logo.png",
      date: "2 days ago"
    },
    {
      title: "Campus Tour: Oxford Medical College, Bangalore",
      description: "Exclusive full campus tour showing labs, hostels, library, and sports facilities at Oxford Medical College.",
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      duration: "08:30",
      category: "Campus Tours",
      views: "22K",
      author: "Rahul Sharma",
      authorImage: "assets/images/logo.png",
      date: "1 week ago"
    },
    {
      title: "From India to Russia: My Study Abroad Journey",
      description: "An inspiring interview with Priya sharing her experience of moving to Russia for MBBS.",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      duration: "15:20",
      category: "Success Stories",
      views: "10K",
      author: "Wayzon Team",
      authorImage: "assets/images/logo.png",
      date: "2 weeks ago"
    },
    {
      title: "Top 5 Engineering Colleges in Karnataka",
      description: "We review the best engineering colleges based on placement, infrastructure, and faculty.",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1186&q=80",
      duration: "10:05",
      category: "Campus Tours",
      views: "35K",
      author: "Wayzon Team",
      authorImage: "assets/images/logo.png",
      date: "3 weeks ago"
    },
    {
      title: "Cultural Fest 2024 Highlights",
      description: "Watch the best moments from this year's inter-college cultural festival!",
      thumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      duration: "05:55",
      category: "Events",
      views: "50K",
      author: "Wayzon Team",
      authorImage: "assets/images/logo.png",
      date: "1 month ago"
    },
    {
      title: "Why Choose MBBS in Georgia?",
      description: "Detailed analysis of pros and cons of studying medicine in Georgia.",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      duration: "18:10",
      category: "Student Life",
      views: "8.5K",
      author: "Dr. Anjali",
      authorImage: "assets/images/logo.png",
      date: "1 month ago"
    }
  ];
}
