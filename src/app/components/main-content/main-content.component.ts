import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
})
export class MainContentComponent {
  @Input() currentServiceTitle: string = 'EDIT INBOUND RULE: sg-rds-production';
}
