import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../service/cart.service';
import { of } from 'rxjs';
import { Inventory } from '../model/investory';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {

    // 模擬 CartService（Spy Object）
    const cartServiceMock = jasmine.createSpyObj('CartService', ['checkout'],
      {
        cart$: of([{
          code: 'ABC', name: 'Book', leftNum: 12,
          description: 'special books', color: 'silver', curNum: 1
        } as Inventory])
      });

    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
      imports: [HttpClientTestingModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('應該初始化 checkoutItems 來自 cartService', () => {
    expect(component.checkoutItems.length).toBe(1);
    expect(component.checkoutItems[0].name).toBe('Book');
  });

  it('呼叫 checkout() 時應該觸發 cartService.checkout()', () => {
    component.checkout(); // 呼叫 component 的方法
    expect(cartServiceSpy.checkout).toHaveBeenCalledWith(component.checkoutItems); // 檢查是否被呼叫
  });
});
