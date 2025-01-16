import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

// Интерфейс для запроса пациента с оберткой user
export interface PatientRegistrationRequestInterface {
  user: PatientInterface & {
    mobilePhoneNumberPasswordInfo: PatientInterface['mobilePhoneNumberPasswordInfo'] & {
      password: string; // Добавляем поле password
    };
  };
}
