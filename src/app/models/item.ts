enum itemSize {
  box,
  medium_box,
  large_box
}
export class Item {
  public id : number;
  public image : string;
  public name : string;
  public description : string;
  public price : string;
  public size : itemSize;

}
