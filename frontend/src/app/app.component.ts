import { Component } from '@angular/core';
import { CartService } from './service/cart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Shopping Bag';

  constructor(private cartService: CartService) { }

  init(): void {
    this.cartService.init();
    console.log('aaa');
  }


}
