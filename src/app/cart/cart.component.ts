import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {Coordinates, Client, AddressData, Order} from "../models/coordinates";
import {AppManager} from "../utils/app-manager";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]

})
export class CartComponent implements OnInit {


  private cd_addressData : AddressData;

  //properties
  title : string = "Est!";
  client: Client;
  shippintType : number;
  orders : FirebaseListObservable<any>;


  constructor(public _cartService: CartService, public db: AngularFireDatabase) {
    this.client = new Client(
      "Ale",
      "05409012",
      "Rua Oscar Freire",
      "2379",
      "São Paulo",
      "São Paulo"
    );
    this.shippintType = 1;

    this.getAdressData("Rua Maria Antonia, 76").then(x => {
      this.cd_addressData = x;
      this.cd_addressData.toString();
    });

    this.orders = db.list('/orders');
  }



  ngOnInit() {

    var a = `query {
              searchOrders(term: "", status: in_progress) {
                edges {
                  node {
                    pk
                    status
                    driver {
                      fullName
                    }
                    created
                    currentDriverPosition {
                      lat
                      lng
                      bearing
                    }
                  }
                }
              }
            }
            `
    var json = JSON.stringify({
      query: a
    });
    this._cartService.post(environment.loggiUrl, json.replace(/(\r\n|\n|\r)/gm,"")).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
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
                      { lat: ${AppManager.instance.distCenter.lat}, lng: ${AppManager.instance.distCenter.lng}, hasService: false }
                      { lat: ${coord.lat}, lng: ${coord.lng} }
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

    this._cartService.post(environment.loggiUrl, json.replace(/(\r\n|\n|\r)/gm,"")).then(response => {
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
            packageType: "document"
            slo: ${this.shippintType}
            clientMutationId: "kcf4819ds08"
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
      this._cartService.post(environment.loggiUrl, json.replace(/(\r\n|\n|\r|\0)/gm,"")).then(response => {
        console.log(response);
        var order = new Order();
        order.pk = response.data.createOrderInquiry.inquiry.pk;
        order.client = this.client;
        order.id = "";
        while(order.id === ""){
          var key = AppManager.instance.makeid();
          var isEqual = false;
          this.orders.forEach(x => {
            if( order.id == key){
              isEqual = true;
            }
          });

          if(!isEqual){
            order.id = key;
          }
        }


        this.orders.push({order: order});

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
          addressData.placeId = response.results[0].place_id;
          return addressData;
        });

    return addressData;
  }

}
