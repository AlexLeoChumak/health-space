// Интерфейс адреса
export interface AddressInfoInterface {
  id: string | null;
  apartment: number | null;
  city: string;
  district: string;
  house: number;
  housing: number | null;
  region: string;
  street: string;
}

// Интерфейс контактных данных
export interface ContactInfoInterface {
  id: string | null;
  email: string;
  homePhoneNumber: string | null;
}

// Интерфейс мобильного телефона и пароля
export interface MobilePhoneNumberPasswordInfoInterface {
  id: string | null;
  mobilePhoneNumber: string;
}

// Интерфейс идентификационных данных
export interface IdentificationInfoInterface {
  id: string | null;
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
}

// Интерфейс персональной информации
export interface PersonalInfoInterface {
  id: string | null;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: string;
  photo: string | File | null;
}

// Интерфейс пациента, объединяющий все подинтерфейсы
export interface PatientInterface {
  id: string | null;
  addressRegistrationInfo: AddressInfoInterface;
  addressResidenceInfo: AddressInfoInterface;
  contactInfo: ContactInfoInterface;
  mobilePhoneNumberPasswordInfo: MobilePhoneNumberPasswordInfoInterface;
  identificationInfo: IdentificationInfoInterface;
  personalInfo: PersonalInfoInterface;
}
