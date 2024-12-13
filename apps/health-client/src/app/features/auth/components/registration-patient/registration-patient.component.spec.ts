import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RegistrationPatientComponent } from './registration-patient.component';

describe('RegistrationPatientComponent', () => {
  let component: RegistrationPatientComponent;
  let fixture: ComponentFixture<RegistrationPatientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationPatientComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Можно передать необходимые параметры
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
