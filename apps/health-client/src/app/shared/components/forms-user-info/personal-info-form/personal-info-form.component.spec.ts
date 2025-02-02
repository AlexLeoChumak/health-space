import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonalInfoFormComponent } from './personal-info-form.component';

describe('PersonalInfoRegistrationFormComponent', () => {
  let component: PersonalInfoFormComponent;
  let fixture: ComponentFixture<PersonalInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PersonalInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
