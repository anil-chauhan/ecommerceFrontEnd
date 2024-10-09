import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustArrivedProductsComponent } from './just-arrived-products.component';

describe('JustArrivedProductsComponent', () => {
  let component: JustArrivedProductsComponent;
  let fixture: ComponentFixture<JustArrivedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JustArrivedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustArrivedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
