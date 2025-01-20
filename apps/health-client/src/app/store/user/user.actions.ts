import { createAction, props } from '@ngrx/store';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export const loadUser = createAction(
  '[User] Load User',
  props<{
    user: PatientInterface | DoctorInterface;
  }>()
);

export const getUrlUserPhotoSuccess = createAction(
  '[User] Get Url User Photo Success',
  props<{ urlUserPhoto: string }>()
);

export const getUrlUserPhotoFailure = createAction(
  '[User] Get Url User Photo Failure'
);

export const clearUser = createAction('[User] Clear User');
