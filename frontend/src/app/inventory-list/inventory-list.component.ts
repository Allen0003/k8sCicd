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
  checkout = false;

  constructor(private cartService: CartService) { }

  cartItems: Inventory[] = [];

  ngOnInit(): void {
    this.cartService.checkout$.subscribe(checkout => {
      this.checkout = checkout;
    });
  }

  onSelect(item: Inventory): void {
    this.selectedItem = item;
  }

  add(item: Inventory): void {
    this.cartService.add(item);
  }

  sub(item: Inventory): void {
    this.cartService.sub(item);
  }

}
