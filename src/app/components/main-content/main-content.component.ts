import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ec2DashboardComponent } from '../ec2-dashboard/ec2-dashboard.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, Ec2DashboardComponent],
  template: `
    <div
      class="h-full flex flex-col bg-slate-950 border border-slate-800 rounded-lg overflow-hidden"
    >
      <!-- Header Bar showing current service / menu title -->
      <div
        class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs"
      >
        <span class="font-semibold text-cyan-400 uppercase tracking-wider">{{
          currentServiceTitle()
        }}</span>
      </div>

      <!-- Dynamic Content Area -->
      <div class="flex-1 overflow-y-auto">
        @if (
          currentServiceTitle().includes('EC2') &&
          currentServiceTitle().includes('Instances')
        ) {
          <!-- Renders your authentic EC2 Dashboard -->
          <app-ec2-dashboard />
        } @else {
          <!-- Placeholder or other views for different menus -->
          <div
            class="flex items-center justify-center h-full text-slate-500 text-xs"
          >
            Viewing: {{ currentServiceTitle() }}
          </div>
        }
      </div>
    </div>
  `,
})
export class MainContentComponent {
  readonly currentServiceTitle = input<string>('');
}
