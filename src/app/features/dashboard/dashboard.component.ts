import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchitectureCanvasComponent } from './components/architecture-canvas/architecture-canvas.component';
import { ConsolePanelComponent } from './components/console-panel/console-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ArchitectureCanvasComponent, ConsolePanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {}
