import {
  AddressInfoInterface,
  ContactInfoInterface,
  MobilePhoneNumberPasswordInfoInterface,
  IdentificationBelarusCitizenInfoInterface,
  IdentificationForeignCitizenInfoInterface,
  PersonalInfoInterface,
  EducationMedicalWorkerInfoInterface,
  PlaceWorkInfoInterface,
} from 'src/app/shared/models';

export interface ChildObjChildNameInterface {
  childObj:
    | AddressInfoInterface
    | ContactInfoInterface
    | MobilePhoneNumberPasswordInfoInterface
    | IdentificationBelarusCitizenInfoInterface
    | IdentificationForeignCitizenInfoInterface
    | PersonalInfoInterface
    | EducationMedicalWorkerInfoInterface
    | PlaceWorkInfoInterface
    | string
    | number
    | null;
  childName: string;
}
