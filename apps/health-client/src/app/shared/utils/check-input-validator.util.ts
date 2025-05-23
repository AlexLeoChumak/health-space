import { FormControl, FormGroup } from '@angular/forms';

export const checkInputValidatorUtil = (
  formGroup: FormGroup | Record<string, FormControl>,
  controlName: string,
  validator: string
): boolean => {
  const control =
    formGroup instanceof FormGroup
      ? formGroup.get(controlName)
      : formGroup[controlName];

  return (
    !!control &&
    control.invalid &&
    control.touched &&
    !!control.errors?.[validator]
  );
};
