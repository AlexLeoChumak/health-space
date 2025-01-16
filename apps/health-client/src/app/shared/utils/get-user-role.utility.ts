import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export const getUserRole = (
  user: PatientInterface | DoctorInterface
): 'doctor' | 'patient' => {
  return 'placeWorkInfo' in user ? 'doctor' : 'patient';
};
