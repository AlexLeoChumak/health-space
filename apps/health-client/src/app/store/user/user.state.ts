import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export interface UserState {
  user: PatientInterface | DoctorInterface | null;
  role: 'patient' | 'doctor' | null;
  urlUserPhoto: string;
}

export const initialUserState: UserState = {
  user: null,
  role: null,
  urlUserPhoto: 'default-profile-image.png',
};
