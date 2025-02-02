import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IdentificationInfoFormForCitizensBelarusComponent } from './identification-info-form-for-citizens-belarus.component';

describe('IdentificationInfoFormForCitizensBelarusComponent', () => {
  let component: IdentificationInfoFormForCitizensBelarusComponent;
  let fixture: ComponentFixture<IdentificationInfoFormForCitizensBelarusComponent>;
  const controls = [
    'personalIdentificationNumber',
    'passportSeriesNumber',
    'passportIssueDate',
    'passportIssuingAuthority',
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IdentificationInfoFormForCitizensBelarusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      IdentificationInfoFormForCitizensBelarusComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the datepicker on button click', () => {
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button).toBeTruthy();

    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isDatepickerOpen()).toBe(true);

    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isDatepickerOpen()).toBe(false);
  });

  it('should set the passport issue date when date is selected', () => {
    const date = '2023-09-01';
    component.onDateChange(date);

    fixture.detectChanges();

    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    expect(component.controls['passportIssueDate'].value).toBe(formattedDate);
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
