import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ec2Instance } from '../../models/aws-service.model';
import { Ec2TerminalComponent } from '../ec2-terminal/ec2-terminal.component';

@Component({
  selector: 'app-ec2-connect-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, Ec2TerminalComponent],
  templateUrl: './ec2-connect-dialog.component.html',
})
export class Ec2ConnectDialogComponent {
  instance = input.required<Ec2Instance | null>();
  close = output<void>();

  showTerminal = signal<boolean>(false);
  hostPort = signal<string>('8080');

  // AWS-style connection option selector
  selectedMethod = signal<string>('ec2-instance-connect');
  sshUser = signal<string>('ec2-user');
}
