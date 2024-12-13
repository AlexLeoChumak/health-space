export interface UserBaseInterface {
  addressRegistrationInfo: {
    apartment: number | null;
    city: string;
    district: string;
    house: number;
    housing: number | null;
    region: string;
    street: string;
  };
  addressResidenceInfo: {
    apartment: number | null;
    city: string;
    district: string;
    house: number;
    housing: number | null;
    region: string;
    street: string;
  };
  contactInfo: {
    email: string;
    homePhoneNumber: string | null;
    mobilePhoneNumber: string;
  };
  identificationInfo: {
    documentName: string | null;
    documentNumber: string | null;
    healthInsuranceContractNumber: string | null;
    nameInsuranceCompany: string | null;
    nameStateForeignCitizen: string | null;
    passportIssueDate: string | null;
    passportIssuingAuthority: string | null;
    passportSeriesNumber: string | null;
    personalIdentificationNumber: string | null;
    userCitizenship: string;
  };
  personalInfo: {
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    gender: string;
    photo: string | File | null;
  };
}

// Интерфейс для запроса пациента с оберткой user
export interface PatientRequestInterface {
  user: UserBaseInterface & {
    contactInfo: UserBaseInterface['contactInfo'] & {
      password: string; // Добавляем поле password
    };
  };
}

// Интерфейс для ответа пациента с оберткой user
export interface PatientResponseInterface {
  id: string;
  user: UserBaseInterface; // Ответ с пользователем без модификаций
}
