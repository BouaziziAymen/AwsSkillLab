import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ec2Instance } from '../../models/aws-service.model';

@Component({
  selector: 'app-ec2-connect-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ec2-connect-dialog.component.html',
})
export class Ec2ConnectDialogComponent {
  instance = input.required<Ec2Instance | null>();
  close = output<void>();
}
