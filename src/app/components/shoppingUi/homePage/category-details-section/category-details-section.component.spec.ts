import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsSectionComponent } from './category-details-section.component';

describe('CategoryDetailsSectionComponent', () => {
  let component: CategoryDetailsSectionComponent;
  let fixture: ComponentFixture<CategoryDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
