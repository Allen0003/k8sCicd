import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../model/investory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: Inventory[] = [];
  private cartSubject = new BehaviorSubject<Inventory[]>([]);
  cart$ = this.cartSubject.asObservable();


  checkoutFlag = false;
  private checkoutSubject = new BehaviorSubject<boolean>(false);
  checkout$ = this.checkoutSubject.asObservable();

  constructor(private http: HttpClient) { }

  getInventoryList(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${environment.apiEndpoints.item}${environment.apiPaths.itemList}`);
  }

  init(): void {
    this.http.get<any>(`${environment.apiEndpoints.item}${environment.apiPaths.initItem}`)
      .subscribe({
        next: (res) => console.log('Init success', res),
        error: (err) => console.error('Init failed', err)
      });
  }


  checkout(checkoutItems: Inventory[]): void {
    this.http.post<any>(`${environment.apiEndpoints.checkout}${environment.apiPaths.checkout}`, checkoutItems)
      .subscribe(
        response => {
        }, error => {
        }
      );
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
    this.checkoutFlag = !this.checkoutFlag;
    this.checkoutSubject.next(this.checkoutFlag);
  }
}
