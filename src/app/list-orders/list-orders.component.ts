import { Component, OnInit } from '@angular/core';
import {AppManager} from "../utils/app-manager";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getOrderList(){
    return AppManager.instance.orderList;
  }


}
