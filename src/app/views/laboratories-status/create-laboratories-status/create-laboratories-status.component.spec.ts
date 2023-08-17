import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaboratoriesStatusComponent } from './create-laboratories-status.component';

describe('CreateLaboratoriesStatusComponent', () => {
  let component: CreateLaboratoriesStatusComponent;
  let fixture: ComponentFixture<CreateLaboratoriesStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLaboratoriesStatusComponent]
    });
    fixture = TestBed.createComponent(CreateLaboratoriesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
