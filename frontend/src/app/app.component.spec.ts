import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from './service/cart.service';
import { InventoryListComponent } from './inventory-list/inventory-list.component'; // ✅ 加入這行
import { CartComponent } from './cart/cart.component'; // ✅ 加這行
import { OrderComponent } from './order/order.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, InventoryListComponent, CartComponent, OrderComponent],
      providers: [CartService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
