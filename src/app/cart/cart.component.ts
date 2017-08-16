import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {Coordinates} from "../models/coordinates";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]

})
export class CartComponent implements OnInit {


  private lat_cd : string;
  private lng_cd : string;



  title : string = "teste atualizacao!";

  constructor(public _cartService: CartService) {
    this.lat_cd = "-23.5443056";
    this.lng_cd = "-46.678062";

  }

  ngOnInit() {
  }

  estimatePrice(cep){
    var coord : Coordinates;
    this._cartService.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + cep).then(response => {
      coord = response.results[0].geometry.location;
      this.getEstimate(coord);
      console.log("DONE");
    });

  }

  getEstimate(coord){
    var query = `query {
  estimateOrder(
    city: 1
    transportType: moto
    points: [
      { lat: ${coord.lat}, lng: ${coord.lng} }
      { lat: ${this.lat_cd}, lng: ${this.lng_cd}, hasService: false }
    ]
  ) {
    routeOptimized
    prices {
      label
      description
      slo
      sloDisplay
      estimatedCost
      distance
      originalEta
    }
    waypoints {
      index
      indexDisplay
      originalIndex
      originalIndexDisplay
      outOfCityCover
      error
    }
  }
}`;
    var json = `{ "query":"${query}"}`;

    console.log(query);

    this._cartService.post("https://staging.loggi.com/graphql?", json.replace(/(\r\n|\n|\r)/gm,"")).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }



}
