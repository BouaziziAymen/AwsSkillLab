import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ec2-launch-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ec2-launch-dialog.component.html',
})
export class Ec2LaunchDialogComponent {
  readonly close = output<void>();
  readonly launched = output<{
    name: string;
    instanceType: string;
    ami: string;
  }>();

  instanceName = '';
  selectedAmi = signal('amzn2023');
  instanceType = 't3.micro';

  submit() {
    this.launched.emit({
      name: this.instanceName,
      instanceType: this.instanceType,
      ami: this.selectedAmi(),
    });
  }
}
