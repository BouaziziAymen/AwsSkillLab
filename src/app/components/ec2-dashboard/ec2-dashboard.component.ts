import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ec2ActionsComponent } from '../ec2-actions/ec2-actions.component';
import { Ec2LaunchDialogComponent } from '../ec2-launch-dialog/ec2-launch-dialog.component';

@Component({
  selector: 'app-ec2-dashboard',
  standalone: true,
  imports: [CommonModule, Ec2ActionsComponent, Ec2LaunchDialogComponent],
  templateUrl: './ec2-dashboard.component.html',
})
export class Ec2DashboardComponent {
  selectedId = signal<string | null>(null);
  isLaunchOpen = signal<boolean>(false);

  handleAction(action: string) {
    console.log('Action selected:', action);
  }

  onInstanceLaunched(instance: any) {
    console.log('Instance launched:', instance);
    this.isLaunchOpen.set(false);
  }
}
