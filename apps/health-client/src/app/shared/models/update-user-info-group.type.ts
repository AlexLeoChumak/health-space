import {
  PersonalInfoInterface,
  ContactInfoInterface,
  MobilePhoneNumberPasswordInfoInterface,
  IdentificationBelarusCitizenInfoInterface,
  IdentificationForeignCitizenInfoInterface,
  AddressInfoInterface,
  EducationMedicalWorkerInfoInterface,
  PlaceWorkInfoInterface,
} from 'src/app/shared/models';

export type UpdateUserInfoGroupType =
  | { personalInfo: PersonalInfoInterface }
  | { contactInfo: ContactInfoInterface }
  | { mobilePhoneNumberPasswordInfo: MobilePhoneNumberPasswordInfoInterface }
  | {
      identificationBelarusCitizenInfo: IdentificationBelarusCitizenInfoInterface;
    }
  | {
      identificationForeignCitizenInfo: IdentificationForeignCitizenInfoInterface;
    }
  | { addressRegistrationInfo: AddressInfoInterface }
  | { addressResidenceInfo: AddressInfoInterface }
  | { addressMedicalInstitutionInfo: AddressInfoInterface }
  | { educationMedicalWorkerInfo: EducationMedicalWorkerInfoInterface }
  | { placeWorkInfo: PlaceWorkInfoInterface };
