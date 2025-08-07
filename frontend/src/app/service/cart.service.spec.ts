import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Inventory } from '../model/investory';
import { environment } from 'src/environments/environment';
import { skip } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  const mockItem: Inventory = {
    code: 'A1',
    name: 'Apple',
    color: 'Red',
    leftNum: 10,
    curNum: 0,
    description: 'Fresh Apple'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // 確保沒有未完成的請求
  });

  it('add() 應該增加 curNum 並加入 cartList', (done) => {
    const item = { ...mockItem };
    setTimeout(() => {
      service.cart$.subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0].curNum).toBe(1);
        done();
      });
    }, 0);

    service.add(item);
  });

  it('sub() 應該減少 curNum 並從 cartList 中移除', (done) => {
    const item = { ...mockItem, curNum: 1 };
    service.add(item); // 先加
    service.sub(item); // 再減

    service.cart$.subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('init() 應該發出 GET 請求', () => {
    service.init();

    const req = httpMock.expectOne(`${environment.apiEndpoints.item}${environment.apiPaths.initItem}`);
    expect(req.request.method).toBe('GET');
    req.flush({}); // 回傳空物件模擬成功
  });

  it('checkout() 應該發出 POST 請求', () => {
    const items: Inventory[] = [{ ...mockItem, curNum: 2 }];

    service.checkout(items);

    const req = httpMock.expectOne(`${environment.apiEndpoints.checkout}${environment.apiPaths.checkout}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(items);
    req.flush({});
  });

  it('display() 應該切換 checkoutFlag 並發出事件', (done) => {

    service.checkout$
      .pipe(skip(1)) // ⛔️ 跳過初始 false
      .subscribe(flag => {
        expect(flag).toBe(true);
        done(); // ✅ 確保只呼叫一次
      });

    service.display(); // 初始是 false，第一次呼叫應該變 true
  });



});
