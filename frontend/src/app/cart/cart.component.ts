import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Inventory } from '../model/investory';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: Inventory[] = [];

  constructor(private cartService: CartService) { }

  //FIXME 還沒收到
  popCart(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      console.log('Cart Items:', this.cartItems);
    });
  }


}
