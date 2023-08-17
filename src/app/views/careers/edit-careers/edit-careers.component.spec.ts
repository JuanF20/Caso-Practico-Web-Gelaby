import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareersComponent } from './edit-careers.component';

describe('EditCareersComponent', () => {
  let component: EditCareersComponent;
  let fixture: ComponentFixture<EditCareersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCareersComponent]
    });
    fixture = TestBed.createComponent(EditCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
