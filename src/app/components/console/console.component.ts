import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { AwsService, AWS_SERVICES } from '../../models/aws-service.model';

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
  selectedService: string = 'EC2';
  selectedRegion: string = 'US East (N. Virginia)';
  activeMenu: string = 'Security Groups';
  activeHeaderTitle: string = 'EDIT INBOUND RULE: sg-security-group';

  services: AwsService[] = AWS_SERVICES; // Uses shared constant

  get currentService(): AwsService {
    return (
      this.services.find((s) => s.id === this.selectedService) ||
      this.services[0]
    );
  }

  onServiceChange() {
    const current = this.currentService;
    if (current && current.menus.length > 0) {
      this.activeMenu = current.menus[0];
      this.activeHeaderTitle = `${current.id} - ${this.activeMenu}`;
    }
  }

  onMenuSelected(menu: string) {
    this.activeMenu = menu;
    this.activeHeaderTitle = `${this.selectedService} - ${menu}`;
  }
}
