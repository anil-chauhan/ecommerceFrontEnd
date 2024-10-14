import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMainPageComponent } from './orders-main-page.component';

describe('OrdersMainPageComponent', () => {
  let component: OrdersMainPageComponent;
  let fixture: ComponentFixture<OrdersMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
