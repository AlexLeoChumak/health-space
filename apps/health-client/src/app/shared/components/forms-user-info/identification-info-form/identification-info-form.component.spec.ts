import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { IdentificationInfoFormComponent } from './identification-info-form.component';

describe('IdentificationInfoFormComponent', () => {
  let component: IdentificationInfoFormComponent;
  let fixture: ComponentFixture<IdentificationInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IdentificationInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentificationInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.identificationInfoFormGroup).toBeDefined();

    const userCitizenshipControl =
      component.identificationInfoFormGroup.get('userCitizenship');
    expect(userCitizenshipControl?.value).toEqual('Республика Беларусь');
    expect(userCitizenshipControl?.valid).toBeTrue();
  });

  it('should emit formReady event after form initialization', () => {
    spyOn(component.formReady, 'emit');
    component.ngOnInit();
    expect(component.formReady.emit).toHaveBeenCalledWith(
      component.identificationInfoFormGroup
    );
  });

  it('should update the citizenship signal and form control value', () => {
    const newCitizenship = 'Other Country';
    spyOn(component.userCitizenshipSignal, 'set');
    component.updateCitizenshipSignal(newCitizenship);
    expect(component.userCitizenshipSignal.set).toHaveBeenCalledWith(
      newCitizenship
    );
    expect(
      component.identificationInfoFormGroup.get('userCitizenship')?.value
    ).toEqual(newCitizenship);
  });

  it('should clear form controls except userCitizenship', () => {
    component.identificationInfoFormGroup.addControl(
      'testControl',
      new FormControl('testValue')
    );
    expect(
      component.identificationInfoFormGroup.contains('testControl')
    ).toBeTrue();

    component.clearFormControls();
    expect(
      component.identificationInfoFormGroup.contains('testControl')
    ).toBeFalse();
    expect(
      component.identificationInfoFormGroup.contains('userCitizenship')
    ).toBeTrue();
  });

  it('should add new controls to the form', () => {
    const controlsToAdd = {
      firstName: new FormControl('John'),
      lastName: new FormControl('Doe'),
    };

    component.addControls(controlsToAdd);
    expect(
      component.identificationInfoFormGroup.contains('firstName')
    ).toBeTrue();
    expect(
      component.identificationInfoFormGroup.contains('lastName')
    ).toBeTrue();
    expect(
      component.identificationInfoFormGroup.get('firstName')?.value
    ).toEqual('John');
    expect(
      component.identificationInfoFormGroup.get('lastName')?.value
    ).toEqual('Doe');
  });
});
