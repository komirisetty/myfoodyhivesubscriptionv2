import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  public prevurl:any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.prevurl=navigation.previousNavigation.finalUrl;
  }
  ngOnInit(): void {
    if(this.prevurl!="/businessinfo"){
      this.router.navigate(["home"]);
     }else{
     window.scrollTo(0,330);}
  }
  gohome($event: any) {
    this.router.navigate(["home"]);
  }
}
