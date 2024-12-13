import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactInfoFormComponent } from './contact-info-form.component';
import { By } from '@angular/platform-browser';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'apps/health-client/src/app/features/auth/constants/form-validation-error-messages.constant';

describe('ContactInfoFormComponent', () => {
  let component: ContactInfoFormComponent;
  let fixture: ComponentFixture<ContactInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContactInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required fields', () => {
    const formGroup = component.contactInfoFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.contains('mobilePhoneNumber')).toBe(true);
    expect(formGroup.contains('homePhoneNumber')).toBe(true);
    expect(formGroup.contains('email')).toBe(true);
    expect(formGroup.contains('password')).toBe(true);
  });

  it('should display error messages for required fields when form is invalid', () => {
    component.contactInfoFormGroup.markAllAsTouched();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.required-to-fill'));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should populate the form controls with validators', () => {
    const mobilePhoneControl =
      component.contactInfoFormGroup.get('mobilePhoneNumber');
    const emailControl = component.contactInfoFormGroup.get('email');
    const passwordControl = component.contactInfoFormGroup.get('password');

    expect(mobilePhoneControl?.validator).toBeDefined();
    expect(emailControl?.validator).toBeDefined();
    expect(passwordControl?.validator).toBeDefined();

    expect(mobilePhoneControl?.validator).toBeInstanceOf(Function);
    expect(emailControl?.validator).toBeInstanceOf(Function);
    expect(passwordControl?.validator).toBeInstanceOf(Function);

    // Проверяем валидатор на пустом контроле для mobilePhoneNumber
    const mobilePhoneValidators = mobilePhoneControl?.validator
      ? mobilePhoneControl.validator({ value: null } as any)
      : null;
    expect(mobilePhoneValidators).toEqual({ required: true });

    // Проверяем валидатор на пустом email контроле
    const emailValidators = emailControl?.validator
      ? emailControl.validator({ value: null } as any)
      : null;
    expect(emailValidators).toEqual({ required: true });

    // Теперь проверим email на некорректный формат
    const emailInvalidFormat = emailControl?.validator
      ? emailControl.validator({ value: 'invalidemail' } as any)
      : null;
    expect(emailInvalidFormat).toEqual({ email: true });

    // Проверяем валидатор на пустом пароле
    const passwordValidators = passwordControl?.validator
      ? passwordControl.validator({ value: '' } as any)
      : null;
    expect(passwordValidators).toEqual({
      required: true,
    });

    // Теперь проверим валидатор на пароле длиной менее 8 символов
    const shortPasswordValidators = passwordControl?.validator
      ? passwordControl.validator({ value: '12345' } as any)
      : null;
    expect(shortPasswordValidators).toEqual({
      minlength: { requiredLength: 8, actualLength: 5 },
    });
  });

  it('should emit formReady event when form is initialized', () => {
    spyOn(component.formReady, 'emit');
    component.ngOnInit();
    expect(component.formReady.emit).toHaveBeenCalledWith(
      component.contactInfoFormGroup
    );
  });

  it('should hide error messages when form is valid', () => {
    component.contactInfoFormGroup
      .get('mobilePhoneNumber')
      ?.setValue('1234567890');
    component.contactInfoFormGroup.get('email')?.setValue('test@example.com');
    component.contactInfoFormGroup.get('password')?.setValue('password123');

    fixture.detectChanges();

    // Find all instances of the validation component that should display errors
    const errors = fixture.debugElement.queryAll(
      By.css('health-validator-form-control')
    );
    errors.forEach((error) => {
      expect(error.nativeElement.textContent).toBe('');
    });
  });

  it('should display correct error messages for invalid email format', () => {
    // Устанавливаем некорректное значение для email
    component.contactInfoFormGroup.get('email')?.setValue('invalid-email');

    // Помечаем поле email как затронутое для активации ошибок
    component.contactInfoFormGroup.get('email')?.markAsTouched();

    fixture.detectChanges();

    // Находим элемент health-error-notification, который отображает ошибку
    const emailError = fixture.debugElement.query(
      By.css('health-error-notification ion-note')
    );

    // Проверяем, что элемент существует
    expect(emailError).toBeTruthy();

    // Проверяем содержимое элемента на наличие сообщения об ошибке
    expect(emailError.nativeElement.textContent).toContain(
      FORM_VALIDATION_ERROR_MESSAGES.email
    );
  });

  it('should display error messages about short password when password shortest than 8 symbols', () => {
    component.contactInfoFormGroup.get('password')?.setValue('short');
    component.contactInfoFormGroup.get('password')?.markAllAsTouched();
    fixture.detectChanges();

    const passwordErrors = fixture.debugElement.query(
      By.css('health-error-notification ion-note')
    );
    expect(passwordErrors).toBeTruthy();
    expect(passwordErrors.nativeElement.textContent).toContain(
      FORM_VALIDATION_ERROR_MESSAGES.minLengthPassword
    );
  });
});
