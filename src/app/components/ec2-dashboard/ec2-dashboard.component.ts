import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ec2Service } from '../../services/ec2.service';
import { Ec2ActionsComponent } from '../ec2-actions/ec2-actions.component';
import { Ec2LaunchDialogComponent } from '../ec2-launch-dialog/ec2-launch-dialog.component';

@Component({
  selector: 'app-ec2-dashboard',
  standalone: true,
  imports: [CommonModule, Ec2ActionsComponent, Ec2LaunchDialogComponent],
  templateUrl: './ec2-dashboard.component.html',
})
export class Ec2DashboardComponent {
  ec2Service = inject(Ec2Service);

  selectedId = signal<string | null>(null);
  isLaunchOpen = signal<boolean>(false);

  handleAction(action: string) {
    const id = this.selectedId();
    if (!id) return;

    if (action === 'stop') {
      this.ec2Service.setInstanceState(id, 'stopped');
    } else if (action === 'start') {
      this.ec2Service.setInstanceState(id, 'running');
    } else if (action === 'terminate') {
      this.ec2Service.setInstanceState(id, 'terminated');
    }
    console.log(`Action ${action} executed on instance ${id}`);
  }

  onInstanceLaunched(instanceData: {
    name: string;
    instanceType: string;
    ami: string;
  }) {
    this.ec2Service.createInstance(instanceData);
    this.isLaunchOpen.set(false);
  }
}
