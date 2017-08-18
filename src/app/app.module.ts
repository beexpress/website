import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from './cart/cart.service';
import {AppManager} from './utils/app-manager';
import {FotoModule} from './foto/foto.module';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {DirectionsMapDirective} from './map/map.directive';
import {ItemComponent} from "./item/item.component";
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const appRoutes: Routes = [
  { path: 'orders', component: ListOrdersComponent },
  { path: 'cart/:id', component: CartComponent},
  { path: 'detail/:id', component: ProductDetailComponent},
  { path: 'confirm/:id', component: ConfirmOrderComponent},
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent},
  { path: 'map/:id', component: MapComponent},
  //{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavComponent,
    FooterComponent,
    ListOrdersComponent,
    MapComponent,
    HomeComponent,
    DirectionsMapDirective,
    ItemComponent,
    CatalogComponent,
    ProductDetailComponent,
    ConfirmOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FotoModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCmaFJhLk3oackahjAyTT01bWDDRAZ8P5c",
      libraries: ["places"]
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only

    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
