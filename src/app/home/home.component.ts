import { Component, HostListener, OnInit } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuItemSelectionInfo } from '../models/menu-item-selection-info';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public menu: Menu[] = [];
  public menuItemSelections: Map<string, MenuItemSummaryInfo>;
  public menuSelections: MenuItemSummaryInfo[];
  // @HostListener('window:scroll', ['$event'])
  //   doSomething(event) {

  //   var offsets =  document.getElementById('sidebar_fixed').getBoundingClientRect();
  //   console.log(offsets.top);
  //   console.log(offsets.left);
  //   if(offsets.top<=71){
  //     document.getElementById('sidebar_fixed').style.position="sticky"
  //   }else{
  //     document.getElementById('sidebar_fixed').style.position="none"
  //   }
  //     if(window.pageYOffset>=321){
  //       // console.log("Scroll Event", window.pageYOffset );
  //     }
  //   }

  constructor(private menuService: MenuService) {
    this.menuItemSelections = new Map<string, MenuItemSummaryInfo>();
    this.menuSelections = [];
    this
    .menuService
    .getMenuItems()
    .subscribe(menuResponse => {
      if (menuResponse.isSuccess) {
        this.menu = menuResponse.data;

        this.menu.forEach(menuInfo => {
          const categoryId = menuInfo.id;

          menuInfo.menuDetails.forEach(menuItemInfo => {
            const uniqueDishId = `${categoryId}${menuItemInfo.dishId}`;

            menuItemInfo.uniqueDishId = uniqueDishId;
          });
        });
      }
      else {
        throw new Error(menuResponse.errorMessage);
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0,0);

  }

  handleMenuItemChanged(menuItemSelectionInfo: MenuItemSelectionInfo) {
    const dishName = menuItemSelectionInfo.menuItem.dishName
    const totalAmount = menuItemSelectionInfo.quantity * menuItemSelectionInfo.menuItem.saleAmount;

    const menuItemSummaryInfo: MenuItemSummaryInfo = {
      dishName,
      quantity: menuItemSelectionInfo.quantity,
      saleAmount: menuItemSelectionInfo.menuItem.saleAmount,
      totalAmount
    };

    if (menuItemSelectionInfo.quantity <= 0) {
      this.menuItemSelections.delete(dishName);
    }
    else {
      this.menuItemSelections.set(dishName, menuItemSummaryInfo);
    }

    this.menuSelections = [...this.menuItemSelections.values()];
  }

}
