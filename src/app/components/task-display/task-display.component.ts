import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-display.component.html',
})
export class TaskDisplayComponent {
  @Input() currentTaskTitle: string = 'Configure VPC Inbound Security Rules';
  @Input() currentTaskDescription: string =
    'Ensure that the security group allows inbound traffic on port 5432 for PostgreSQL from the private subnet only.';
}
