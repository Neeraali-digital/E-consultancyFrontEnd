import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
  review = {
    studentName: '',
    course: '',
    rating: '',
    review: '',
    status: 'pending'
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Review saved:', this.review);
    // Add save logic here
    this.router.navigate(['/admin/reviews']);
  }
}