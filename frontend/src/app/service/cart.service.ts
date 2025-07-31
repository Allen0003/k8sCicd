// 正確做法：把共用資料邏輯移到一個真正的 Service
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../model/investory';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartList: Inventory[] = [];
  private cartSubject = new BehaviorSubject<Inventory[]>([]);
  cart$ = this.cartSubject.asObservable();


  checkout = false;
  private checkoutSubject = new BehaviorSubject<boolean>(false);
  checkout$ = this.checkoutSubject.asObservable();


  add(item: Inventory): void {
    if (item.curNun != undefined && item.leftNum != undefined) {
      if (item.curNun < item.leftNum) {
        item.curNun++;
        if (item.curNun == 1) {
          this.cartList.push(item);
        }
        this.cartSubject.next(this.cartList);
      }
    }
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
          this.cartList.splice(idx, 1);
          this.cartSubject.next(this.cartList);
        }
      }
    }
  }

  display(): void {
    this.checkout = !this.checkout;
    this.checkoutSubject.next(this.checkout);
  }
  
}
