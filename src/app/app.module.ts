import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'orders', component: ListOrdersComponent },
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavComponent,
    FooterComponent,
    ListOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CollapseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
