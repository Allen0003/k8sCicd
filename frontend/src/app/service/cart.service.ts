// 正確做法：把共用資料邏輯移到一個真正的 Service
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../model/investory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //FIXME
  private baseUrl = 'http://localhost:8081/item';


  private cartList: Inventory[] = [];
  private cartSubject = new BehaviorSubject<Inventory[]>([]);
  cart$ = this.cartSubject.asObservable();


  checkout = false;
  private checkoutSubject = new BehaviorSubject<boolean>(false);
  checkout$ = this.checkoutSubject.asObservable();

  constructor(private http: HttpClient) { }

  getInventoryList(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseUrl}/list`);
  }


  add(item: Inventory): void {
    if (item.curNum != undefined && item.leftNum != undefined) {
      if (item.curNum < item.leftNum) {
        item.curNum++;
        if (item.curNum == 1) {
          this.cartList.push(item);
        }
        this.cartSubject.next(this.cartList);
      }
    }
  }

  sub(item: Inventory): void {
    if (item.curNum != undefined) {
      if (item.curNum > 0) {
        item.curNum--;
        if (item.curNum == 0) {
          var idx = 0;
          this.cartList.forEach((cur, index) => {
            if (cur.curNum == 0) {
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
