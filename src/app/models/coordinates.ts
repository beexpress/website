
import {forEach} from "@angular/router/src/utils/collection";

export class Coordinates {

  public lat: number;
  public lng: number;
}

export class Client {
  public coord : Coordinates;
  public addressData : AddressData;
  public street_complement : string;

  constructor(
    public name : string,
    public cep : string,
    public street : string,
    public street_number : string,
    public city : string,
    public state : string,


  ){}
}


export class Order {
  constructor(){}

  public id : string;
  public client : Client;
  public pk : number;
  public isConfirmed : boolean;
  public shipping : OrderShip;

}

export class OrderShip {
  constructor(){}
  public id : number;
  public eta : number;
  public orderPrice : number;

}

export class AddressData{
  public addressComponents : [AddressComponent];
  public formattedAdrress : string;
  public geometry : Geometry;
  public types : [string];
  public placeId : string;

  toString(){
    var acStr = "";

    for (var i = 0; i < this.addressComponents.length; i++){
      acStr += `{longName : "${this.addressComponents[i].long_name}", shortName : "${this.addressComponents[i].short_name}", types : ${JSON.stringify(this.addressComponents[i].types)}}`;
      acStr = (this.addressComponents[i] == this.addressComponents[this.addressComponents.length-1]) ? acStr + "" : acStr + ",";

      //console.log(acStr);
    }

    var s = `{addressComponents: [${acStr}], formattedAddress: "${this.formattedAdrress}", geometry: {location: {lat: ${this.geometry.location.lat}, lng: ${this.geometry.location.lng}}}, types: ${JSON.stringify(this.types)}}`;

    return s;
  }
}

class AddressComponent{
  public long_name : string;
  public short_name : string;
  public types : [string];
}

class Geometry {
  public location : Coordinates;
}
