import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RegistrationDoctorComponent } from './registration-doctor.component';

describe('RegistrationDoctorComponent', () => {
  let component: RegistrationDoctorComponent;
  let fixture: ComponentFixture<RegistrationDoctorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationDoctorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Можно передать необходимые параметры
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize form', () => {
  //   component.ngOnInit();
  //   expect(component.registrationForm).toBeTruthy();

  //   const userControl = component.registrationForm.get('user');
  //   expect(userControl).toBeTruthy();
  //   expect(userControl instanceof FormGroup).toBeTrue();
  // });

  it('should toggle isRegistrationAndResidenceAddressesMatch when checkbox clicked', () => {
    const initialValue = component.isRegistrationAndResidenceAddressesMatch();
    component.toggleCheckboxCopyRegistrationAddress();

    expect(component.isRegistrationAndResidenceAddressesMatch()).toBe(
      !initialValue
    );
  });

  it('should toggle isRegistrationAndResidenceAddressesMatch and called copyRegistrationAddressToResidenceAddress', () => {
    spyOn(component, 'copyRegistrationAddressToResidenceAddress');

    const checkbox = fixture.debugElement.query(By.css('ion-checkbox'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    const adrressesMatch = component.isRegistrationAndResidenceAddressesMatch();
    expect(adrressesMatch).toBe(true);
    expect(
      component.copyRegistrationAddressToResidenceAddress
    ).toHaveBeenCalledWith(adrressesMatch);
  });

  it('should copy registration address to residence address when isRegistrationAndResidenceAddressesMatch is true', () => {
    // Мок данные для адреса регистрации
    const mockRegistrationAddress = {
      street: '123 Main St',
      city: 'SomeCity',
      postalCode: '12345',
    };

    // Инициализируем форму с контролами адресов
    component.registrationForm = new FormGroup({
      user: new FormGroup({
        addressRegistrationInfo: new FormGroup({
          street: new FormControl(mockRegistrationAddress.street),
          city: new FormControl(mockRegistrationAddress.city),
          postalCode: new FormControl(mockRegistrationAddress.postalCode),
        }),
        addressResidenceInfo: new FormGroup({
          street: new FormControl(''),
          city: new FormControl(''),
          postalCode: new FormControl(''),
        }),
      }),
    });

    // Вызываем метод с isRegistrationAndResidenceAddressesMatch = true
    component.copyRegistrationAddressToResidenceAddress(true);

    // Проверяем, что адрес проживания обновился значениями из адреса регистрации
    expect(
      component.registrationForm.get('user.addressResidenceInfo')?.value
    ).toEqual(mockRegistrationAddress);
  });

  it('should reset residence address when isRegistrationAndResidenceAddressesMatch is false', () => {
    // Мок данные для адреса проживания
    const mockResidenceAddress = {
      street: '456 Another St',
      city: 'OtherCity',
      postalCode: '67890',
    };

    // Инициализируем форму с контролами адресов
    component.registrationForm = new FormGroup({
      user: new FormGroup({
        addressRegistrationInfo: new FormGroup({
          street: new FormControl(''),
          city: new FormControl(''),
          postalCode: new FormControl(''),
        }),
        addressResidenceInfo: new FormGroup({
          street: new FormControl(mockResidenceAddress.street),
          city: new FormControl(mockResidenceAddress.city),
          postalCode: new FormControl(mockResidenceAddress.postalCode),
        }),
      }),
    });

    // Вызываем метод с isRegistrationAndResidenceAddressesMatch = false
    component.copyRegistrationAddressToResidenceAddress(false);

    // Проверяем, что адрес проживания сброшен
    expect(
      component.registrationForm.get('user.addressResidenceInfo')?.value
    ).toEqual({
      street: null,
      city: null,
      postalCode: null,
    });
  });

  it('should add formGroup in form', () => {
    const formGroup = new FormGroup({
      street: new FormControl('111'),
      city: new FormControl('222'),
    });

    const userGroup = component.registrationForm.get('user') as FormGroup;
    expect(userGroup).toBeTruthy();

    component.addFormGroup('formGroupName', formGroup);
    expect(userGroup.contains('formGroupName')).toBeTruthy();
    expect(userGroup.get('formGroupName')).toEqual(formGroup);
  });
});
