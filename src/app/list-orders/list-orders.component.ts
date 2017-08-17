import { Component, OnInit } from '@angular/core';
import {AppManager} from "../utils/app-manager";
import {async} from "rxjs/scheduler/async";
import {CartService} from "../cart/cart.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [CartService]
})
export class ListOrdersComponent implements OnInit {

  constructor(public _cartService: CartService) { }

  ngOnInit() {
    var query = "query {\n" +
      "  allPaymentMethods {\n" +
      "    edges {\n" +
      "      node {\n" +
      "        pk\n" +
      "        name\n" +
      "        type\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n";

    var json = JSON.stringify({
      query: query
    });
    this._cartService.post(environment.loggiUrl, json.replace(/(\r\n|\n|\r|\0)/gm,"")).then(response => {
      console.log(response);
      // if(response.success){
      //   AppManager.instance.orderList.update(key,{pk: response.order.pk, isConfirmed: true});
      // }
    }).catch(error => {
      console.log(error);
    });

  }

  getOrderList(){
    return AppManager.instance.orderList;
  }

  confirmOrder(key : string, order){
    var query = `mutation {
                  confirmOrder(input: {
                    inquiry: "${order.pk}"
                    paymentMethod: ${environment.mCard}
                    clientMutationId: "confirm_order"
                  }) {
                    success
                    order {
                      pk
                      status
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
    this._cartService.post(environment.loggiUrl, json.replace(/(\r\n|\n|\r|\0)/gm,"")).then(response => {
      console.log("key: "+key);
      console.log(response);
      if(response.data.confirmOrder.success){
        console.log("entrou");
        order.isConfirmed = true;
        order.orderId = response.data.confirmOrder.order.pk;
        AppManager.instance.orderList.update(key,{order: order});
      }
    }).catch(error => {
      console.log(error);
    });
  }

}
