import { Component } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AppManager} from "./utils/app-manager";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(db: AngularFireDatabase){
    AppManager.instance.orderList = db.list('/orders');
  }
}
