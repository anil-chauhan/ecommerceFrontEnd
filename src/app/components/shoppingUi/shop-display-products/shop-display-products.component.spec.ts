import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDisplayProductsComponent } from './shop-display-products.component';

describe('ShopDisplayProductsComponent', () => {
  let component: ShopDisplayProductsComponent;
  let fixture: ComponentFixture<ShopDisplayProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopDisplayProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
