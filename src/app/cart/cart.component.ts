import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {Coordinates, Client, AddressData, Order} from "../models/coordinates";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]

})
export class CartComponent implements OnInit {


  private lat_cd : string;
  private lng_cd : string;
  private cd_addressData : AddressData;

  //properties
  title : string = "Est!";
  client: Client;
  shippintType : number;


  constructor(public _cartService: CartService) {
    this.lat_cd = "-23.5443056";
    this.lng_cd = "-46.678062";
    this.client = new Client(
      "Josefino",
      "01222010",
      "Rua Vergueiro",
      "430",
      "São Paulo",
      "São Paulo"
    );
    this.shippintType = 1;

    this.getAdressData("Rua Maria Antonia, 76").then(x => {
      this.cd_addressData = x;
      this.cd_addressData.toString();
    });




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

    this.getAdressData(this.client.street + ", " + this.client.street_number + " - " + this.client.city).then(x => {
      this.client.addressData = x;
      var query = `mutation {
          createOrderInquiry(input: {
            city: 1
            packageType: "box"
            slo: ${this.shippintType}
            clientMutationId: "test_inquiry"
            waypoints: [
              {
                addressComplement: "Ap 34"
                instructions: "Retirada de pacote"
                tag: , retirar_pacote
                addressData: ${this.cd_addressData}
              }, {
                addressComplement: "${this.client.street_complement}"
                instructions: "Entregar pacote"
                tag: entregar
                addressData: ${this.client.addressData}
              }]
          }) {
            success
            inquiry {
              pk
              distance
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
        }`;
      var json = JSON.stringify({
        query: query
      });
      //console.log(json);
      this._cartService.post("https://staging.loggi.com/graphql?", json.replace(/(\r\n|\n|\r|\0)/gm,"")).then(response => {
        console.log(response);
        this.client.order = new Order();
        this.client.order.pk = response.data.createOrderInquiry.inquiry.pk;
      }).catch(error => {
        console.log(error);
      });
    });
  }

  private async getAdressData(address : string) {
    var addressData = new AddressData();
    var finished = false;

        await this._cartService.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address).then(response => {
          addressData.addressComponents = response.results[0].address_components;
          addressData.formattedAdrress = response.results[0].formatted_address;
          addressData.geometry = response.results[0].geometry;
          addressData.types = response.results[0].types;
          return addressData;
        });

    return addressData;
  }

}
