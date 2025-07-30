import { Component, OnInit } from '@angular/core';
import { Inventory } from '../model/investory';
import { InventoryList } from '../model/mock-inventory-list';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})



export class InventoryListComponent implements OnInit {
  inventoryArr = InventoryList;

  selectedItem: Inventory | undefined;

  cartList: Inventory[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {

  }

  onSelect(item: Inventory): void {
    this.selectedItem = item;
  }


  add(item: Inventory): void {
    this.cartService.add(item);
    // if (item.curNun != undefined && item.leftNum != undefined) {
    //   if (item.curNun < item.leftNum) {
    //     item.curNun++;
    //     this.cartService.add(item);
    //     this.cartList.push(item);
    //   }
    // }
  }

  sub(item: Inventory): void {
    if (item.curNun != undefined) {
      if (item.curNun > 0) {
        item.curNun--;
        if (item.curNun == 0) {
          var idx = 0;
          this.cartList.forEach((cur, index) => {
            if (cur.curNun == 0) {
              idx = index;
            }
          });
          this.cartList.splice(idx, idx);
        }
      }
    }
  }


}
