import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaboratoriesComponent } from './create-laboratories.component';

describe('CreateLaboratoriesComponent', () => {
  let component: CreateLaboratoriesComponent;
  let fixture: ComponentFixture<CreateLaboratoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLaboratoriesComponent]
    });
    fixture = TestBed.createComponent(CreateLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
