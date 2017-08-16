import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrdersListComponent } from './orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
