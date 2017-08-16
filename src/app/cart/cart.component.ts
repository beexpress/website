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
  title: string;
  constructor(public _cartService: CartService) { }

  ngOnInit() {
  }

  estimatePrice(cep){
    var coord : Coordinates;
    this._cartService.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + cep).then(response => {
      coord = response.results[0].geometry.location;
      console.log("DONE");
    });

    var query = `{
      "query": "
        query {
              estimateOrder(
                city: 1
                transportType: moto
                points: [
                  { lat: -23.5024555, lng: -46.696077100000025 }
                  { lat: -23.5050657, lng: -46.69513159999997, hasService: false }
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
            }" 
      }`

    this._cartService.post()
    //this.title = "Your location is: "+ coord.lat + ", "+coord.lng;

  }

}
