import { createAction, props } from '@ngrx/store';
import {
  ChildObjChildNameInterface,
  ErrorMessageInterface,
} from 'src/app/shared/models';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: PatientInterface | DoctorInterface }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<ErrorMessageInterface>()
);

export const setUrlUserPhotoSuccess = createAction(
  '[User] Set Url User Photo Success',
  props<{ urlUserPhoto: string }>()
);

export const setIdUserSection = createAction(
  '[User] Set Id User Section',
  props<{ idUserSection: string }>()
);

export const setUserSectionData = createAction(
  '[User] Set User Section Data',
  props<{ userSectionData: ChildObjChildNameInterface }>()
);

export const clearUser = createAction('[User] Clear User');
