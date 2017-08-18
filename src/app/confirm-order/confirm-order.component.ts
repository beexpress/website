import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  orderId: string;
  sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = params['id'];

      // In a real app: dispatch action to load the details here.
    });
  }

}
