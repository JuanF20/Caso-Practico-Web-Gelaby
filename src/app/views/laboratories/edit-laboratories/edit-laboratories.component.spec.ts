import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboratoriesComponent } from './edit-laboratories.component';

describe('EditLaboratoriesComponent', () => {
  let component: EditLaboratoriesComponent;
  let fixture: ComponentFixture<EditLaboratoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLaboratoriesComponent]
    });
    fixture = TestBed.createComponent(EditLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
