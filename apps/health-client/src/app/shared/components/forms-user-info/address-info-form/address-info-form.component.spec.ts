import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddressInfoFormComponent } from './address-info-form.component';

describe('AddressInfoFormComponent', () => {
  let component: AddressInfoFormComponent;
  let fixture: ComponentFixture<AddressInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddressInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required fields', () => {
    const formGroup = component.addressInfoFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.contains('region')).toBe(true);
    expect(formGroup.contains('district')).toBe(true);
    expect(formGroup.contains('city')).toBe(true);
    expect(formGroup.contains('street')).toBe(true);
    expect(formGroup.contains('house')).toBe(true);
    expect(formGroup.contains('housing')).toBe(true);
    expect(formGroup.contains('apartment')).toBe(true);
  });

  it('should mark fields as required', () => {
    const formGroup = component.addressInfoFormGroup;
    const regionControl = formGroup.get('region');
    const districtControl = formGroup.get('district');
    const cityControl = formGroup.get('city');
    const streetControl = formGroup.get('street');
    const houseControl = formGroup.get('house');

    regionControl?.setValue(null);
    districtControl?.setValue(null);
    cityControl?.setValue(null);
    streetControl?.setValue(null);
    houseControl?.setValue(null);

    expect(regionControl?.valid).toBe(false);
    expect(districtControl?.valid).toBe(false);
    expect(cityControl?.valid).toBe(false);
    expect(streetControl?.valid).toBe(false);
    expect(houseControl?.valid).toBe(false);
  });

  it('should display error messages for required fields', () => {
    component.addressInfoFormGroup.markAllAsTouched();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.required-to-fill'));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should populate region select options', () => {
    const selectElement = fixture.debugElement.query(By.css('ion-select'));
    expect(selectElement).toBeTruthy();

    const regions = component.regions;
    expect(regions.length).toBeGreaterThan(0);

    const options = fixture.debugElement.queryAll(By.css('ion-select-option'));
    expect(options.length).toBe(regions.length);
  });

  it('should display apartment field when "addressTypeProps" is "Адрес регистрации"', () => {
    fixture.componentRef.setInput('addressTypeProps', 'Адрес регистрации');
    fixture.detectChanges();

    const apartmentField = fixture.debugElement.query(
      By.css('ion-input[formControlName="apartment"]')
    );
    expect(apartmentField).toBeTruthy();
  });

  it('should hide apartment field when "addressTypeProps" is "Адрес места работы"', () => {
    fixture.componentRef.setInput('addressTypeProps', 'Адрес места работы');
    fixture.detectChanges();

    const apartmentField = fixture.debugElement.query(
      By.css('ion-input[formControlName="apartment"]')
    );
    expect(apartmentField).toBeFalsy();
  });

  it('should emit formReady event with form group when initialized', () => {
    spyOn(component.formReady, 'emit');
    component.ngOnInit();
    expect(component.formReady.emit).toHaveBeenCalledWith(
      component.addressInfoFormGroup
    );
  });
});
