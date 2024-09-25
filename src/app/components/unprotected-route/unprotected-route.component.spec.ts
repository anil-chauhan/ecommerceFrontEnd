import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprotectedRouteComponent } from './unprotected-route.component';

describe('UnprotectedRouteComponent', () => {
  let component: UnprotectedRouteComponent;
  let fixture: ComponentFixture<UnprotectedRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnprotectedRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnprotectedRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
