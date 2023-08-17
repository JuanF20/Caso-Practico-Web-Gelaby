import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLaboratoriesComponent } from './calendar-laboratories.component';

describe('CalendarLaboratoriesComponent', () => {
  let component: CalendarLaboratoriesComponent;
  let fixture: ComponentFixture<CalendarLaboratoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarLaboratoriesComponent]
    });
    fixture = TestBed.createComponent(CalendarLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
