import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IdentificationInfoFormForForeignCitizensComponent } from './identification-info-form-for-foreign-citizens.component';

describe('IdentificationInfoFormForForeignCitizensComponent', () => {
  let component: IdentificationInfoFormForForeignCitizensComponent;
  let fixture: ComponentFixture<IdentificationInfoFormForForeignCitizensComponent>;
  const controls = [
    'nameStateForeignCitizen',
    'documentName',
    'documentNumber',
    'nameInsuranceCompany',
    'healthInsuranceContractNumber',
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IdentificationInfoFormForForeignCitizensComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      IdentificationInfoFormForForeignCitizensComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  controls.forEach((control) => {
    it(`should initialize form control: ${control}`, () => {
      expect(component.controls[control]).toBeTruthy();
    });

    it(`should mark field ${control} as required when empty`, () => {
      component.controls[control].setValue('');
      fixture.detectChanges();

      expect(component.controls[control].invalid).toBe(true);
    });

    it(`should display error messages for required field ${control}`, () => {
      component.controls[control].setValue('');
      component.controls[control].markAllAsTouched();
      fixture.detectChanges();

      const errorNotification = fixture.debugElement.query(
        By.css('health-error-notification ion-note')
      );
      expect(errorNotification).toBeTruthy();
      expect(errorNotification.nativeElement.textContent.trim()).toEqual(
        component.FORM_VALIDATION_ERROR_MESSAGES.required
      );
    });
  });
});
