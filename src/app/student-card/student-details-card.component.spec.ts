import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsCardComponent } from './student-details-card.component';

describe('StudentDetailsCardComponent', () => {
  let component: StudentDetailsCardComponent;
  let fixture: ComponentFixture<StudentDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
