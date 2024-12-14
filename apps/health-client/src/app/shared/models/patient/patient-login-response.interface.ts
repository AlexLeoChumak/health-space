import { UserBaseInterface } from 'src/app/shared/models/patient/user-base.interface';

// Интерфейс для ответа пациента с оберткой user
export interface PatientLoginResponseInterface {
  id: string;
  user: UserBaseInterface; // Ответ с пользователем без модификаций
}
