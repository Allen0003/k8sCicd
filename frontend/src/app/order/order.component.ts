import { Component, Input } from '@angular/core';
import { Inventory } from '../model/investory';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  @Input() item : Inventory | undefined;


  putIntoCart(item: Inventory): void {
    //call the back end and 
    console.log(item);
  }
}
