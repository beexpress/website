import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  orderId: number;
  lat: number = -23.5465034;
  lng: number = -46.6507577;
  zoom: number = 12;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }


}
