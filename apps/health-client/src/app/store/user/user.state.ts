import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export interface UserState {
  user: PatientInterface | DoctorInterface | null;
  role: 'patient' | 'doctor' | null;
}

export const initialUserState: UserState = {
  user: null,
  role: null,
};
