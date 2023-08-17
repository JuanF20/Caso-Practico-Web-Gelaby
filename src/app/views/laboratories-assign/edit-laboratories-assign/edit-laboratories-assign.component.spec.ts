import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboratoriesAssignComponent } from './edit-laboratories-assign.component';

describe('EditLaboratoriesAssignComponent', () => {
  let component: EditLaboratoriesAssignComponent;
  let fixture: ComponentFixture<EditLaboratoriesAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLaboratoriesAssignComponent]
    });
    fixture = TestBed.createComponent(EditLaboratoriesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
