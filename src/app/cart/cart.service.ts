import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Coordinates} from "../models/coordinates";

@Injectable()
export class CartService {

  constructor(private http: Http) { }

   public get(url): Promise<any>
  {
    return this.http.get(url).map(response => {
      return response.json() || {success: false, message: "No response from server"};
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  // public post(url, data): Promise<any>
  // {
  //   var headers = new Headers();
  //   headers.append('Authorization','')
  //   headers.append('Content-type','application/json');
  //   return this.http.post(url, data, { headers: headers }).map(response => {
  //     return response.json() || {success: false, message: "No response from server"};
  //   }).catch((error: Response | any) => {
  //     return Observable.throw(error.json());
  //   }).toPromise();
  // }

}
