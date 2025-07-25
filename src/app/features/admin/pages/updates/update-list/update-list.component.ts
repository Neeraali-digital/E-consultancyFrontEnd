import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent {
  updates = [
    {
      id: 1,
      title: 'New Admission Process for 2024',
      description: 'Updated admission guidelines and requirements for the upcoming academic year',
      date: new Date('2024-01-15'),
      status: 'active'
    },
    {
      id: 2,
      title: 'Scholarship Opportunities Available',
      description: 'Multiple scholarship programs now open for eligible students',
      date: new Date('2024-01-10'),
      status: 'active'
    }
  ];
}