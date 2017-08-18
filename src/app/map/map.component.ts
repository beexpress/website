import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';
import {AngularFireDatabase} from "angularfire2/database";
import {AppManager} from "../utils/app-manager";
import {Order} from "../models/coordinates";
import {DirectionsMapDirective} from "./map.directive";

declare var google:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapsAPIWrapper ]
})
export class MapComponent implements OnInit {


  orderId: string;
  lat: number = -23.5465034;
  lng: number = -46.6507577;
  zoom: number = 12;
  private sub: any;
  order : any;
  public origin :any ; // its a example aleatory position
  public destination : any; // its a example aleatory position
  @ViewChild(DirectionsMapDirective) map : DirectionsMapDirective;

  constructor(private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

    var test = AppManager.instance.orderList.subscribe();

      AppManager.instance.orderList.subscribe(snapshots =>
        snapshots.forEach(x => {
          //console.log(x);
          if(x.order.id === this.orderId){
            this.order = x.order;
            this.map.origin = {longitude: AppManager.instance.distCenter.lng, latitude: AppManager.instance.distCenter.lat };
            this.map.destination = {longitude: this.order.client.addressData.geometry.location.lng, latitude: this.order.client.addressData.geometry.location.lng};
            this.map.destinationPlaceId = this.order.client.addressData.placeId;
            this.map.originPlaceId = AppManager.instance.distPlaceId;
            if(this.map.directionsDisplay === undefined) {
              this.mapsAPILoader.load().then(() => {
                this.map.directionsDisplay = new google.maps.DirectionsRenderer;
              });
            }
              this.map.updateDirections();
            this.zoom = 12;
          }
      }));

    //Update the directions



  }


}
