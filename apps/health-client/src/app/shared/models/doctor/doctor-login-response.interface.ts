import { DoctorBaseInterface } from 'src/app/shared/models/doctor/doctor-base.interface';

export interface DoctorLoginResponseInterface {
  id: string;
  user: DoctorBaseInterface;
}
