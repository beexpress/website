import {Order} from "../models/coordinates";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

export class AppManager {

  private static _instance : AppManager;

  public orderList : FirebaseListObservable<any>;


  constructor(){
    if(AppManager._instance){
      throw new Error("ERROR: there is already one instance of this class");
    }
    AppManager._instance = this;
    //AppManager.orderList = new Array<Order>();
  }

  public static get instance(){
    return this._instance || (this._instance = new AppManager());
  }

  public setOrderList(list){
    this.orderList = list;
  }

}
