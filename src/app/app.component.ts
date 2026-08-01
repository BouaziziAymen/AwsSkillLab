import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  template: `<app-dashboard></app-dashboard>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
