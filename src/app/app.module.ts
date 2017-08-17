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
import {AngularFireDatabaseModule} from "angularfire2/database";
import {CartService} from "./cart/cart.service";
import {AppManager} from "./utils/app-manager";
import {FotoModule} from './foto/foto.module';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';


const appRoutes: Routes = [
  { path: 'orders', component: ListOrdersComponent },
  { path: 'cart', component: CartComponent},
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent},
  { path: 'map', component: MapComponent}
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FotoModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAt19EYB5ucFJvuftbdYtplhQrq60yP4BI'
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
