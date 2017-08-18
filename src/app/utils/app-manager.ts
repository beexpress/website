import {Coordinates, Order} from "../models/coordinates";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

export class AppManager {

  private static _instance : AppManager;

  public orderList : FirebaseListObservable<any>;
  public distCenter : Coordinates;
  public distPlaceId : string = "ChIJRfWSvUlYzpQR7aW_XmUmHm8";


  constructor(){
    if(AppManager._instance){
      throw new Error("ERROR: there is already one instance of this class");
    }
    AppManager._instance = this;
    this.distCenter = {lat: -23.5443056, lng: -46.678062 };
    //AppManager.orderList = new Array<Order>();
  }

  public static get instance(){
    return this._instance || (this._instance = new AppManager());
  }

  public setOrderList(list){
    this.orderList = list;
  }

  public makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

}
