import { UserBaseInterface } from 'src/app/shared/models/patient/user-base.interface';

// Интерфейс для запроса пациента с оберткой user
export interface PatientRegistrationRequestInterface {
  user: UserBaseInterface & {
    contactInfo: UserBaseInterface['contactInfo'] & {
      password: string; // Добавляем поле password
    };
  };
}
