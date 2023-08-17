import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaboratoriesAssignComponent } from './create-laboratories-assign.component';

describe('CreateLaboratoriesAssignComponent', () => {
  let component: CreateLaboratoriesAssignComponent;
  let fixture: ComponentFixture<CreateLaboratoriesAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLaboratoriesAssignComponent]
    });
    fixture = TestBed.createComponent(CreateLaboratoriesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
