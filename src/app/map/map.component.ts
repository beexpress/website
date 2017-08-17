import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  lat: number = -23.5465034;
  lng: number = -46.6507577;

  ngOnInit() {
  }


}
