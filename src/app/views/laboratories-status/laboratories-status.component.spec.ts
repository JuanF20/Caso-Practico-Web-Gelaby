import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesStatusComponent } from './laboratories-status.component';

describe('LaboratoriesStatusComponent', () => {
  let component: LaboratoriesStatusComponent;
  let fixture: ComponentFixture<LaboratoriesStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoriesStatusComponent]
    });
    fixture = TestBed.createComponent(LaboratoriesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
