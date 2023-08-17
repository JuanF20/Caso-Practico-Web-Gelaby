import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTeachersComponent } from './calendar-teachers.component';

describe('CalendarTeachersComponent', () => {
  let component: CalendarTeachersComponent;
  let fixture: ComponentFixture<CalendarTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTeachersComponent]
    });
    fixture = TestBed.createComponent(CalendarTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
