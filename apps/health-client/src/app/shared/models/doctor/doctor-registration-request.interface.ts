import { DoctorInterface } from 'src/app/shared/models/doctor/doctor.interface';

export interface DoctorRegistrationRequestInterface {
  user: DoctorInterface & {
    mobilePhoneNumberPasswordInfo: DoctorInterface['mobilePhoneNumberPasswordInfo'] & {
      password: string;
    };
  };
}
