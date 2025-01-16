import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export interface PatientLoginResponseInterface {
  accessToken: string;
  user: PatientInterface;
}
