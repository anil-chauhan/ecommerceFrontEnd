import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLinkMenuComponent } from './page-link-menu.component';

describe('PageLinkMenuComponent', () => {
  let component: PageLinkMenuComponent;
  let fixture: ComponentFixture<PageLinkMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLinkMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLinkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
