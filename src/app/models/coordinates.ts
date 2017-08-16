export class Coordinates {

  public lat: number;
  public lng: number;
}

export class Client {

  public coord : Coordinates;
  public order : Order;

  constructor(){}
}


export class Order {
  constructor(){}

  public pk : number;
  public orderPrice : number;
  public shippingId : number;
}
