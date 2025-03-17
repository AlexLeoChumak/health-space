import { UserInfoGroupInterface, UserRoleType } from 'src/app/shared/models';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export interface UserState {
  user: PatientInterface | DoctorInterface | null;
  role: UserRoleType | null;
  urlUserPhoto: string;
  idUserSection: string | null;
  userSectionData: UserInfoGroupInterface | null;
  userError: string | null;
  photoError: string | null;
}

export const initialUserState: UserState = {
  user: null,
  role: null,
  urlUserPhoto: 'default-profile-image.png',
  idUserSection: null,
  userSectionData: null,
  userError: null,
  photoError: null,
};
