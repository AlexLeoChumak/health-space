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

// Интерфейс идентификационных данных гражданина РБ
export interface IdentificationBelarusCitizenInfoInterface {
  id: string | null;
  passportIssueDate: string | null;
  passportIssuingAuthority: string | null;
  passportSeriesNumber: string | null;
  personalIdentificationNumber: string | null;
}

// Интерфейс идентификационных данных иностранного гражданина
export interface IdentificationForeignCitizenInfoInterface {
  id: string | null;
  documentName: string | null;
  documentNumber: string | null;
  healthInsuranceContractNumber: string | null;
  nameInsuranceCompany: string | null;
  nameStateForeignCitizen: string | null;
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
  identificationBelarusCitizenInfo: IdentificationBelarusCitizenInfoInterface;
  identificationForeignCitizenInfo: IdentificationForeignCitizenInfoInterface;
  personalInfo: PersonalInfoInterface;
}
