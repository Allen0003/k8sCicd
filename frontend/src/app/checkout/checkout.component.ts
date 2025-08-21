import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Inventory } from '../model/investory';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutItems: Inventory[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.checkoutItems = items;
    });
  }

  checkout(): void {
    this.cartService.checkout(this.checkoutItems);
  }
//test2
}
