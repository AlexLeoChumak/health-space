import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EducationMedicalWorkerInfoFormComponent } from './education-medical-worker-info-form.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'apps/health-client/src/app/features/auth/constants/form-validation-error-messages.constant';

describe('EducationMedicalWorkerInfoFormComponent', () => {
  let component: EducationMedicalWorkerInfoFormComponent;
  let fixture: ComponentFixture<EducationMedicalWorkerInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EducationMedicalWorkerInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationMedicalWorkerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    const formGroup = component.educationMedicalWorkerInfoFormGroup;

    expect(formGroup.contains('nameEducationalInstitution')).toBeTruthy();
    expect(formGroup.contains('faculty')).toBeTruthy();
    expect(formGroup.contains('speciality')).toBeTruthy();
    expect(
      formGroup.contains('numberDiplomaHigherMedicalEducation')
    ).toBeTruthy();
    expect(formGroup.contains('specialization')).toBeTruthy();
    expect(formGroup.contains('specialistCertificateNumber')).toBeTruthy();
    expect(formGroup.contains('licenseNumberMedicalActivities')).toBeTruthy();
  });

  it('should emit formReady with form group on initialization', () => {
    spyOn(component.formReady, 'emit');

    component.ngOnInit();

    expect(component.formReady.emit).toHaveBeenCalledWith(
      component.educationMedicalWorkerInfoFormGroup
    );
  });

  it('should validate nameEducationalInstitution field as required', () => {
    const controls = [
      'nameEducationalInstitution',
      'faculty',
      'speciality',
      'numberDiplomaHigherMedicalEducation',
      'specialization',
      'specialistCertificateNumber',
      'licenseNumberMedicalActivities',
    ];

    controls.forEach((control) => {
      const ctr = component.educationMedicalWorkerInfoFormGroup.get(control);
      expect(ctr).toBeTruthy();

      ctr?.setValue(null);
      expect(ctr?.valid).toBeFalsy();
      expect(ctr?.errors?.['required']).toBeTruthy();

      ctr?.setValue('Some Info');
      expect(ctr?.valid).toBeTruthy();
    });
  });

  it('should display validation error message when nameEducationalInstitution is empty', () => {
    const control = component.educationMedicalWorkerInfoFormGroup.get(
      'nameEducationalInstitution'
    );
    control?.setValue('');
    control?.markAllAsTouched();
    fixture.detectChanges();

    const errorNotification = fixture.debugElement.query(
      By.css('health-error-notification ion-note')
    );
    expect(errorNotification.nativeElement.textContent).toContain(
      FORM_VALIDATION_ERROR_MESSAGES.required
    );
  });

  it('should invalidate the form if any required field is empty', () => {
    component.educationMedicalWorkerInfoFormGroup
      .get('nameEducationalInstitution')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('faculty')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('speciality')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('numberDiplomaHigherMedicalEducation')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('specialization')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('specialistCertificateNumber')
      ?.setValue(null);
    component.educationMedicalWorkerInfoFormGroup
      .get('licenseNumberMedicalActivities')
      ?.setValue(null);

    expect(component.educationMedicalWorkerInfoFormGroup.valid).toBeFalsy();
  });
});
