import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderedItemsComponent } from './show-ordered-items.component';

describe('ShowOrderedItemsComponent', () => {
  let component: ShowOrderedItemsComponent;
  let fixture: ComponentFixture<ShowOrderedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowOrderedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
