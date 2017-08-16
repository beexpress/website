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



  title : string = "Est!";

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

  createNewOrder(){
    var query = `mutation {
          createOrderInquiry(input: {
            city: 1
            packageType: "document"
            slo: 1
            clientMutationId: "test_inquiry"
            waypoints: [
              {
                addressComplement: "Complemento retirada"
                instructions: "Retirada de documento"
                tag: , retirar_documento
                addressData: {addressComponents: [{longName: "161", shortName: "161", types: ["street_number"]}, {longName: "Rua Antônieta Leitão", shortName: "R. Antônieta Leitão", types: ["route"]}, {longName: "Freguesia do Ó", shortName: "Freguesia do Ó", types: ["neighborhood", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["locality", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["administrative_area_level_2", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["administrative_area_level_1", "political"]}, {longName: "Brazil", shortName: "BR", types: ["country", "political"]}, {longName: "02925-160", shortName: "02925-160", types: ["postal_code"]}], formattedAddress: "Rua Antônieta Leitão, 161 - Freguesia do Ó, São Paulo - SP, 02925-160, Brazil", geometry: {location: {lat: -23.5024555, lng: -46.696077100000025}}, types: ["street_address"]}
              }, {
                addressComplement: "Complemento da entrega"
                instructions: "Entregar documento"
                tag: entregar
                addressData: {addressComponents: [{longName: "153", shortName: "153", types: ["street_number"]}, {longName: "Rua Balsa", shortName: "R. Balsa", types: ["route"]}, {longName: "Freguesia do Ó", shortName: "Freguesia do Ó", types: ["sublocality_level_1", "sublocality", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["locality", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["administrative_area_level_2", "political"]}, {longName: "São Paulo", shortName: "SP", types: ["administrative_area_level_1", "political"]}, {longName: "Brazil", shortName: "BR", types: ["country", "political"]}, {longName: "02910", shortName: "02910", types: ["postal_code_prefix", "postal_code"]}], formattedAddress: "R. Balsa, 153 - Freguesia do Ó, São Paulo - SP, Brazil", geometry: {location: {lat: -23.5050657, lng: -46.69513159999997}}, types: ["street_address"]}
              }, {
                addressComplement: "Complemento retorno"
                instructions: "Retorno de documento"
                tag: outros
                isReturn: true
                addressData: {addressComponents: [{longName: "161", shortName: "161", types: ["street_number"]}, {longName: "Rua Antônieta Leitão", shortName: "R. Antônieta Leitão", types: ["route"]}, {longName: "Freguesia do Ó", shortName: "Freguesia do Ó", types: ["neighborhood", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["locality", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["administrative_area_level_2", "political"]}, {longName: "São Paulo", shortName: "São Paulo", types: ["administrative_area_level_1", "political"]}, {longName: "Brazil", shortName: "BR", types: ["country", "political"]}, {longName: "02925-160", shortName: "02925-160", types: ["postal_code"]}], formattedAddress: "Rua Antônieta Leitão, 161 - Freguesia do Ó, São Paulo - SP, 02925-160, Brazil", geometry: {location: {lat: -23.5024555, lng: -46.696077100000025}}, types: ["street_address"]}
              }]
          }) {
            success
            inquiry {
              pk
              pricing {
                totalCmGross
                bonuses
                totalCm
                appliedBonuses {
                  discount
                  key
                  usercode
                }
              }
              numWaypoints
              productDescription
              paymentMethod {
                name
              }
            }
            errors {
              field
              message
            }
          }
        }`
  }

}
