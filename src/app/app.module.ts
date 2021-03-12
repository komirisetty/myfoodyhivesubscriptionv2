import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroMainComponent } from './hero-main/hero-main.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BusinessinfoComponent } from './businessinfo/businessinfo.component';
import { SummaryviewComponent } from './summaryview/summaryview.component';
import { HomeComponent } from './home/home.component';
import { PriceviewPipe } from './pipes/priceview.pipe';
import { MenuitemviewComponent } from './menuitemview/menuitemview.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { CommonModule } from '@angular/common';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroMainComponent,
    FooterComponent,
    NavigationComponent,
    SummaryComponent,
    ConfirmationComponent,
    BusinessinfoComponent,
    SummaryviewComponent,
    HomeComponent,
    PriceviewPipe,
    MenuitemviewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxStickySidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
