import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {
  reviews = [
    {
      id: 1,
      studentName: 'Rahul Sharma',
      course: 'B.Tech Computer Science',
      rating: 5,
      review: 'Excellent guidance and support throughout the admission process. Highly recommended!',
      date: new Date('2024-01-15'),
      status: 'approved'
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      course: 'MBA',
      rating: 4,
      review: 'Good service and professional approach. Got admission in my preferred college.',
      date: new Date('2024-01-12'),
      status: 'pending'
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}