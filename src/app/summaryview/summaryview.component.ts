import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { browserRefresh } from '../app.component';
import { SubscriberInfo } from '../models/subscriber-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';
import { SubscriptionRequestMapService } from '../services/subscription-request-map-service';
import { SubscriptionRequestsService } from '../services/subscriptionrequests.service';
import { MenuItemSelectionInfo } from '../models/menu-item-selection-info';
import { MenuItem } from '../models/menuitem';
@Component({
  selector: 'app-summaryview',
  templateUrl: './summaryview.component.html',
  styleUrls: ['./summaryview.component.css']
})
export class SummaryviewComponent implements OnInit {

  @Input() public subscriptionRequestSummary: SubscriptionRequestSummary;
  @Input() public subscriberInfo: SubscriberInfo;
  @Input() public validationerror: any;

  public errorMessage: string = '';
  public totalAmount: number = 0;
  public emptyfield:boolean=false;
  public phonefield:boolean=false;
  public emailfield:boolean=false;
  public zipcodefield:boolean=false;
  @Input() public menuItem: MenuItem;
  @Output() public menuItemChanged = new EventEmitter<MenuItemSelectionInfo>();

  public quantity: number = 0;
  constructor(private router: Router,
    private subscriptionRequestMapService: SubscriptionRequestMapService,
    private subscriptionrequestsService: SubscriptionRequestsService) {
  }

  ngOnInit(): void {
    console.log("Refreshed ? : " + browserRefresh);

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

  testforvalidation() { //empty field validation
    for (var property in this.subscriberInfo) {
      if (this.subscriberInfo[property] == "") {
        this.validationerror[property] = "*";
      } else {this.validationerror[property] = "";
    }
    }
    if(this.subscriberInfo.fullName == "" ||this.subscriberInfo.companyName == "" ||
    this.subscriberInfo.emailAddress == "" ||this.subscriberInfo.phoneNumber == "" ||
    this.subscriberInfo.addressLine1 == "" ||this.subscriberInfo.addressLine2 == "" ||
    this.subscriberInfo.state == "" ||this.subscriberInfo.city == "" ||
    this.subscriberInfo.country == "" ||this.subscriberInfo.zipCode == ""
     ){
      this.emptyfield=false;
    }
    else{
      this.emptyfield=true;
    }
  }

  validatezip() {
    var regexzip = /^\d{6}$/;// phone validation
    if (this.subscriberInfo.zipCode == "") {
      this.validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else if (!regexzip.test(this.subscriberInfo.zipCode)) {
      this.validationerror.zipCode = "*";
      this.zipcodefield=false;
    }
    else {
      this.zipcodefield=true; this.validationerror.zipCode = "";
    }
  }

  validateemail() {
    var regexemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.subscriberInfo.emailAddress == "") {
      this.validationerror.emailAddress = "*";
      this.emailfield=false;
    }
    else if (!regexemail.test(this.subscriberInfo.emailAddress)) {
      this.validationerror.emailAddress = "*";
      this.emailfield=false;
      }
    else {
      this.emailfield=true; this.validationerror.emailAddress = "";
    }
  }

  validatephone() {
    var regexphone = /^\d{10}$/;// phone validation
    if (this.subscriberInfo.phoneNumber == "") {
      this.validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else if (!regexphone.test(this.subscriberInfo.phoneNumber)) {
      this.validationerror.phoneNumber = "*";
      this.phonefield=false;
    }
    else {
      this.phonefield=true; this.validationerror.phoneNumber = "";
    }
  }

  confirmOrder($event: any) {
    this.testforvalidation();
    this.validatephone();
    this.validatezip();
    this.validateemail();

    if (this.phonefield && this.emptyfield && this.emailfield && this.zipcodefield) {
      const subscriptionRequest = this.subscriptionRequestMapService.map(this.subscriptionRequestSummary, this.subscriberInfo);

      this
        .subscriptionrequestsService
        .submitSubscriptionRequest(subscriptionRequest)
        .subscribe(response => {
          if (response.isSuccess) {
            this.router.navigate(["confirmation"]);
          } else {
            this.errorMessage = response.errorMessage;
          }
        });
    }

  }

  addMoreItems($event: any) {
    // this.router.navigate(["home"]);
  }
}
