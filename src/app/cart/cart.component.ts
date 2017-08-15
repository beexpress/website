import { Component, OnInit } from '@angular/core';
import { HttpHelper } from '../utils/http-helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  estimatePrice(cep){

    //let bodyString = JSON.stringify({user:user,password:pass});
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option
    return this.http
      .post(url,bodyString,options)
      .map((response:Response)=> response.json() );
  }

  }

}
