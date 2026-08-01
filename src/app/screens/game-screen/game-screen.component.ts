import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchitectureCanvasComponent } from '../../components/architecture-canvas/architecture-canvas.component';
import { ConsoleComponent } from '../../components/console/console.component';
import { TaskDisplayComponent } from '../../components/task-display/task-display.component';

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [
    CommonModule,
    ArchitectureCanvasComponent,
    ConsoleComponent,
    TaskDisplayComponent,
  ],
  templateUrl: './game-screen.component.html',
})
export class GameScreenComponent {
  taskTitle = 'Secure Database Inbound Traffic';
  taskDescription =
    'Isolate your RDS database instance by restricting security group ingress rules to trusted application subnets only.';
}
