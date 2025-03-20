import { UserRoleType } from 'src/app/shared/models';
import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';
import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export const getUserRoleUtil = (
  user: PatientInterface | DoctorInterface
): UserRoleType => {
  return 'placeWorkInfo' in user ? 'doctor' : 'patient';
};
