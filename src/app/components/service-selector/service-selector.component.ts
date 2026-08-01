import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-selector.component.html',
})
export class ServiceSelectorComponent {
  @Input() selectedService: string = 'VPC';
  @Output() serviceChange = new EventEmitter<string>();

  isDropdownOpen = false;

  selectService(service: string) {
    this.selectedService = service;
    this.isDropdownOpen = false;
    this.serviceChange.emit(service);
  }
}
