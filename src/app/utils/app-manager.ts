import {Order} from "../models/coordinates";

export class AppManager {

  private static _instance : AppManager;

  public orderList : Array<Order>;

  constructor(){
    if(AppManager._instance){
      throw new Error("ERROR: there is already one instance of this class");
    }
    AppManager._instance = this;
    this.orderList = new Array<Order>();
  }

  public static get instance(){
    return this._instance || (this._instance = new this());
  }
}
