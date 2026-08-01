import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AwsService, AWS_SERVICES } from '../../models/aws-service.model';

@Component({
  selector: 'app-service-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-selector.component.html',
})
export class ServiceSelectorComponent {
  @Input() selectedService: string = 'EC2';
  @Output() serviceChange = new EventEmitter<string>();
  @Output() serviceSelectedObj = new EventEmitter<AwsService>();

  isDropdownOpen = false;
  searchQuery = '';

  services: AwsService[] = AWS_SERVICES; // Uses shared constant

  get filteredServices(): AwsService[] {
    if (!this.searchQuery.trim()) {
      return this.services;
    }
    const query = this.searchQuery.toLowerCase();
    return this.services.filter(
      (s) =>
        s.id.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query),
    );
  }

  getCurrentServiceObj(): AwsService {
    return (
      this.services.find((s) => s.id === this.selectedService) ||
      this.services[0]
    );
  }

  selectService(service: AwsService) {
    this.selectedService = service.id;
    this.isDropdownOpen = false;
    this.searchQuery = '';
    this.serviceChange.emit(service.id);
    this.serviceSelectedObj.emit(service);
  }
}
