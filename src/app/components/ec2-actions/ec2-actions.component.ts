import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ec2-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ec2-actions.component.html',
})
export class Ec2ActionsComponent {
  readonly disabled = input<boolean>(true);
  readonly actionSelected = output<string>();
  readonly isOpen = signal(false);

  selectAction(action: string) {
    this.isOpen.set(false);
    this.actionSelected.emit(action);
  }
}
