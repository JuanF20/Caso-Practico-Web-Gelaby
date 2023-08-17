import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeachersDetailsComponent } from './create-teachers-details.component';

describe('CreateTeachersDetailsComponent', () => {
  let component: CreateTeachersDetailsComponent;
  let fixture: ComponentFixture<CreateTeachersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeachersDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateTeachersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
