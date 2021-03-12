import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItemSelectionInfo } from '../models/menu-item-selection-info';
import { MenuItem } from '../models/menuitem';

@Component({
  selector: 'app-menuitemview',
  templateUrl: './menuitemview.component.html',
  styleUrls: ['./menuitemview.component.css']
})
export class MenuitemviewComponent implements OnInit {

  @Input() public menuItem: MenuItem;
  @Output() public menuItemChanged = new EventEmitter<MenuItemSelectionInfo>();

  public quantity: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleQuantity(units: number) {
    this.quantity -= units;

    if (this.quantity <= 0) {
      this.quantity = 0;
    }

    this.menuItemChanged.emit({
      menuItem: this.menuItem,
      quantity: this.quantity
    });
  }
}
