import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';

export interface DoctorLoginResponseInterface {
  accessToken: string;
  user: DoctorInterface;
}
