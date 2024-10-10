import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayCardComponent } from './product-display-card.component';

describe('ProductDisplayCardComponent', () => {
  let component: ProductDisplayCardComponent;
  let fixture: ComponentFixture<ProductDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
