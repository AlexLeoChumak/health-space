import { createAction, props } from '@ngrx/store';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';
import {
  UserInfoGroupInterface,
  ErrorMessageInterface,
} from 'src/app/shared/models';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: PatientInterface | DoctorInterface }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<ErrorMessageInterface>()
);

export const setUrlUserPhoto = createAction('[User] Set Url User Photo');

export const setUrlUserPhotoSuccess = createAction(
  '[User] Set Url User Photo Success',
  props<{ urlUserPhoto: string }>()
);

export const setUrlUserPhotoFailure = createAction(
  '[User] Set Url User Photo Failure',
  props<ErrorMessageInterface>()
);

export const setIdUserInfoGroup = createAction(
  '[User] Set Id User Info Group',
  props<{ idUserInfoGroup: string }>()
);

export const setUserInfoGroup = createAction(
  '[User] Set User Info Group',
  props<{ userInfoGroup: UserInfoGroupInterface }>()
);

export const clearUser = createAction('[User] Clear User');
