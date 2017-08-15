import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EstimateTimeComponent } from './estimate-time/estimate-time.component';

@NgModule({
  declarations: [
    AppComponent,
    EstimateTimeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
