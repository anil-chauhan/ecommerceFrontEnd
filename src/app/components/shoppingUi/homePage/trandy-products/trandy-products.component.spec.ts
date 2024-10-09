import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrandyProductsComponent } from './trandy-products.component';

describe('TrandyProductsComponent', () => {
  let component: TrandyProductsComponent;
  let fixture: ComponentFixture<TrandyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrandyProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrandyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
