import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessinfoComponent } from './businessinfo/businessinfo.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "businessinfo", component: BusinessinfoComponent },
  { path: "confirmation", component: ConfirmationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash:true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
