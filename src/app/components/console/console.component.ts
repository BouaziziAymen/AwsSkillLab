import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { MainContentComponent } from '../main-content/main-content.component';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    LeftMenuComponent,
    MainContentComponent,
  ],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent {
  selectedService: string = 'VPC';
  selectedRegion: string = 'US East (N. Virginia)';
  activeHeaderTitle: string = 'EDIT INBOUND RULE: sg-rds-production';

  onServiceChange() {
    // Add custom logic when service changes if needed
  }
}
