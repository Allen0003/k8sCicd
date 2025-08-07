import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListComponent } from './inventory-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from '../service/cart.service';
import { OrderComponent } from '../order/order.component'; // ✅ 加這行（路徑根據實際修改）

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryListComponent, OrderComponent],
      imports: [HttpClientTestingModule], // ✅ 加這行
      providers: [CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
