import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutCustomerFormComponent } from './check-out-customer-form.component';

describe('CheckOutCustomerFormComponent', () => {
  let component: CheckOutCustomerFormComponent;
  let fixture: ComponentFixture<CheckOutCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckOutCustomerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
