import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarHelpSupportComponent } from './top-bar-help-support.component';

describe('TopBarHelpSupportComponent', () => {
  let component: TopBarHelpSupportComponent;
  let fixture: ComponentFixture<TopBarHelpSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarHelpSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarHelpSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
