import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemSummaryInfo } from '../models/menu-item-summary-info';
import { SubscriberInfo } from '../models/subscriber-info';
import { SubscriptionRequestSummary } from '../models/subscription-request-summary';

@Component({
  selector: 'app-businessinfo',
  templateUrl: './businessinfo.component.html',
  styleUrls: ['./businessinfo.component.css']
})
export class BusinessinfoComponent implements OnInit {

  public subscriptionRequestSummary: SubscriptionRequestSummary;
  public subscriberInfo: SubscriberInfo;

  public Validationerror: any;

  e: string;
  companyName: string;
  public prevurl: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.prevurl = navigation.previousNavigation?.finalUrl;
    this.subscriptionRequestSummary = navigation.extras.state as SubscriptionRequestSummary;

    this.subscriberInfo = {
      companyName: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      emailAddress: "",
      phoneNumber: ""
    };

    this.Validationerror = {
      companyName: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      emailAddress: "",
      phoneNumber: ""
    };
  }

  ngOnInit(): void {
     var x= this.prevurl;
    if(/home/.test(x)){
      window.scrollTo(0,330);
    }
  else{
    this.router.navigate(["home"]);
    }
  }

  onfocusfn(e: any) {
    if (e == 1) {
      this.Validationerror.companyName = "";
    }
    if (e == 2) {
      this.Validationerror.fullName = "";
    }
    if (e == 3) {
      this.Validationerror.addressLine1 = "";
    }
    if (e == 4) {
      this.Validationerror.addressLine2 = "";
    }
    if (e == 5) {
      this.Validationerror.city = "";
    }
    if (e == 6) {
      this.Validationerror.state = "";
    }
    if (e == 7) {
      this.Validationerror.zipCode = "";
    }
    if (e == 8) {
      this.Validationerror.country = "";
    }
    if (e == 9) {
      this.Validationerror.emailAddress = "";
    }
    if (e == 10) {
      this.Validationerror.phoneNumber = "";
    }
  }

  onblurfn(g: any) {
    if (g == 1 && this.subscriberInfo.companyName == "") {
      this.Validationerror.companyName = "*";
    }
    if (g == 2 && this.subscriberInfo.fullName == "") {
      this.Validationerror.fullName = "*";
    }
    if (g == 3 && this.subscriberInfo.addressLine1 == "") {
      this.Validationerror.addressLine1 = "*";
    }
    if (g == 4 && this.subscriberInfo.addressLine2 == "") {
      this.Validationerror.addressLine2 = "*";
    }
    if (g == 5 && this.subscriberInfo.city == "") {
      this.Validationerror.city = "*";
    }
    if (g == 6 && this.subscriberInfo.state == "") {
      this.Validationerror.state = "*";
    }
    if (g == 7 && this.subscriberInfo.zipCode == "") {
      this.Validationerror.zipCode = "*";
    }
    if (g == 8 && this.subscriberInfo.country == "") {
      this.Validationerror.country = "*";
    }
    if (g == 9 && this.subscriberInfo.emailAddress == "") {
      this.Validationerror.emailAddress = "*";
    }
    if (g == 10 && this.subscriberInfo.phoneNumber == "") {
      this.Validationerror.phoneNumber = "*";
    }
  }
}
