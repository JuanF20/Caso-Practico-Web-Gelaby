import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesAssignComponent } from './laboratories-assign.component';

describe('LaboratoriesAssignComponent', () => {
  let component: LaboratoriesAssignComponent;
  let fixture: ComponentFixture<LaboratoriesAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoriesAssignComponent]
    });
    fixture = TestBed.createComponent(LaboratoriesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
