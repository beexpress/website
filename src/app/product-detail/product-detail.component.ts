import { Component, OnInit } from '@angular/core';
import {AppManager} from "../utils/app-manager";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  prod: {
    name: any;
    price: any;
    image: any;
    description: any;
  };
  sub: any;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.setProduct(params['id']);

      // In a real app: dispatch action to load the details here.
    });
  }


  public setProduct(id){
    AppManager.instance.productsList.subscribe(snapshots => {
      snapshots.forEach(prod => {
        if(id === prod.$key){
          this.prod = {
            name: prod.name,
            price: prod.price,
            image: prod.image,
            description: prod.description
          }
        }
      });

    });

  }

}
