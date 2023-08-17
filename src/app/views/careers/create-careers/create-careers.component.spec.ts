import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareersComponent } from './create-careers.component';

describe('CreateCareersComponent', () => {
  let component: CreateCareersComponent;
  let fixture: ComponentFixture<CreateCareersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCareersComponent]
    });
    fixture = TestBed.createComponent(CreateCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
