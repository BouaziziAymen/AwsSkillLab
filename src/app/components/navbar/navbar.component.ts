import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceSelectorComponent } from '../service-selector/service-selector.component';
import { RegionSelectorComponent } from '../region-selector/region-selector.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ServiceSelectorComponent, RegionSelectorComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() selectedService: string = 'VPC';
  @Input() selectedRegion: string = 'US East (N. Virginia)';

  @Output() serviceChange = new EventEmitter<string>();
  @Output() regionChange = new EventEmitter<string>();
}
