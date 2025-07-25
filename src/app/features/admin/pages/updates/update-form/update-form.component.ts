import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  update = {
    title: '',
    description: '',
    status: 'active'
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Update saved:', this.update);
    // Add save logic here
    this.router.navigate(['/admin/updates']);
  }
}