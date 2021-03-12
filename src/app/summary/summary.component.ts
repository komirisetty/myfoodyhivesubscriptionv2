import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() public menuItemSummaries: MenuItemSummaryInfo[];
  @Input() public isSubscriberInfoValid: boolean = false;

  public deliveryFee: number = 0;
  public packagingCharges: number = 0;
  public deliveryPlan: string = "Weekly";
  public deliveryDate: string = "";
  public deliveryTime: string = "";
  public isTodayAvailable: boolean = true;
  public subtotal: number = 0;
  public total: number = 0;
  public tax: number = 0;
  public isError: boolean = true;

  constructor(private router: Router) {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();

    if (currentHours >= 12) {
      this.isTodayAvailable = false;
    }

  }

  ngOnInit(): void {

    document.getElementById("divsubclick").style.cursor = "not-allowed";
    document.getElementById("subclick").style.pointerEvents = "none";
  }

  validcheck() {
    if (this.deliveryDate == "" || this.deliveryTime == "" || this.total==0) {
      document.getElementById("divsubclick").style.cursor = "not-allowed";
      document.getElementById("subclick").style.pointerEvents = "none";

    }
    else {
      document.getElementById("divsubclick").style.cursor = "pointer";
      document.getElementById("subclick").style.pointerEvents = "auto";

    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.subtotal = 0;
    this.total = 0;

    this.menuItemSummaries.forEach(
      menuItemSummary => this.subtotal += menuItemSummary.totalAmount);

    this.tax = +(this.subtotal * 0.05).toFixed(2);
    this.total = this.subtotal + this.deliveryFee + this.packagingCharges + this.tax;

    const validation = this.menuItemSummaries.length >= 1 &&
      typeof this.deliveryPlan !== undefined && this.deliveryPlan !== null && this.deliveryPlan !== "" &&
      typeof this.deliveryDate !== undefined && this.deliveryDate !== null && this.deliveryDate !== "" &&
      typeof this.deliveryTime !== undefined && this.deliveryTime !== null && this.deliveryTime !== "";

    this.isError = !validation;
  }

  navigate($event: any) {
    const subscriptionRequestSummary: SubscriptionRequestSummary = {
      menuItemSummaries: this.menuItemSummaries,
      deliveryFee: this.deliveryFee,
      packagingCharges: this.packagingCharges,
      deliveryPlan: this.deliveryPlan,
      deliveryDate: this.deliveryDate,
      deliveryTime: this.deliveryTime,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax
    };

    const navigationExtraDetails: NavigationExtras = {
      state: subscriptionRequestSummary
    };

    this.router.navigate(["businessinfo"], navigationExtraDetails);
  }
}
