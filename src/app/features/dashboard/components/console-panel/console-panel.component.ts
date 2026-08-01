import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AwsService } from '../../../../core/services/aws.service';

@Component({
  selector: 'app-console-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './console-panel.component.html',
  styleUrls: ['./console-panel.component.css'],
})
export class ConsolePanelComponent {
  awsService = inject(AwsService);
  isDropdownOpen = false;
  selectedService: string = 'RDS';
  newPort: number = 5432;
  newSource: string = '0.0.0.0/0';

  onServiceChange() {
    switch (this.selectedService) {
      case 'RDS':
        this.newPort = 5432;
        break;
      case 'S3':
        this.newPort = 443;
        break;
      case 'LAMBDA':
        this.newPort = 80;
        break;
      case 'VPC':
        this.newPort = 0;
        break;
    }
  }

  onAddRule() {
    if (this.newPort !== null) {
      this.awsService.addRule({
        service: this.selectedService,
        port: Number(this.newPort),
        protocol: 'TCP',
        source: this.newSource,
      });
    }
  }
}
