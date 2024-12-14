import { DoctorBaseInterface } from 'src/app/shared/models/doctor/doctor-base.interface';

export interface DoctorRegistrationRequestInterface {
  user: DoctorBaseInterface & {
    contactInfo: DoctorBaseInterface['contactInfo'] & {
      password: string;
    };
  };
}
