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
