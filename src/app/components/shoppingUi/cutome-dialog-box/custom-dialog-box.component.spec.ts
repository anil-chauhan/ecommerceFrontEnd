import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogBoxComponent } from './custom-dialog-box.component';

describe('CutomeDialogBoxComponent', () => {
  let component: CustomDialogBoxComponent;
  let fixture: ComponentFixture<CustomDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
