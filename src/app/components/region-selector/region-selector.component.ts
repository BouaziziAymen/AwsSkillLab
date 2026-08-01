import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './region-selector.component.html',
})
export class RegionSelectorComponent {
  @Input() selectedRegion: string = 'US East (N. Virginia)';
  @Output() regionChange = new EventEmitter<string>();

  isRegionDropdownOpen = false;

  selectRegion(region: string) {
    this.selectedRegion = region;
    this.isRegionDropdownOpen = false;
    this.regionChange.emit(region);
  }
}
