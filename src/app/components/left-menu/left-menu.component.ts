import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-menu.component.html',
})
export class LeftMenuComponent {
  @Input() menus: string[] = [];
  @Input() selectedMenu: string = '';
  @Output() menuSelected = new EventEmitter<string>();

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    this.menuSelected.emit(menu);
  }
}
