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

  add(item: Inventory): void {
    if (item.curNun != undefined && item.leftNum != undefined) {
      if (item.curNun < item.leftNum) {
        item.curNun++;
        this.cartList.push(item);
        this.cartSubject.next(this.cartList);
      }
    }
  }
}
