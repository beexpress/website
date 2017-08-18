import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AppManager} from "../utils/app-manager";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {


  @Input()
  public product: any;

  public id: number;
  public name: string;
  public price: number;
  public image: string;


  constructor() {}
  ngOnInit() {
    this.name = this.product.name;
    this.price = this.product.price;
    this.image = this.product.image;
}

}
