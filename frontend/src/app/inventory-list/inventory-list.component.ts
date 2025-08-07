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
  inventoryArr : Inventory[] = []; 

  selectedItem: Inventory | undefined;
  checkoutFlag = false;

  constructor(private cartService: CartService) { }

  cartItems: Inventory[] = [];

  ngOnInit(): void {
    this.cartService.getInventoryList().subscribe({
      next: (data) => {
         this.inventoryArr = data;
      },
      error: (err) => {
        this.inventoryArr = InventoryList;
      }
    });



    this.cartService.checkout$.subscribe(checkoutFlag => {
      this.checkoutFlag = checkoutFlag;
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
