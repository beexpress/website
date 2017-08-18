import { Component, OnInit } from '@angular/core';
import {AppManager} from "../utils/app-manager";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getProducts(){
    return AppManager.instance.productsList;
  }

}
