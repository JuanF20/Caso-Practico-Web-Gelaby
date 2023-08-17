import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachersDetailsComponent } from './edit-teachers-details.component';

describe('EditTeachersDetailsComponent', () => {
  let component: EditTeachersDetailsComponent;
  let fixture: ComponentFixture<EditTeachersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeachersDetailsComponent]
    });
    fixture = TestBed.createComponent(EditTeachersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
