import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboratoriesStatusComponent } from './edit-laboratories-status.component';

describe('EditLaboratoriesStatusComponent', () => {
  let component: EditLaboratoriesStatusComponent;
  let fixture: ComponentFixture<EditLaboratoriesStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLaboratoriesStatusComponent]
    });
    fixture = TestBed.createComponent(EditLaboratoriesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
