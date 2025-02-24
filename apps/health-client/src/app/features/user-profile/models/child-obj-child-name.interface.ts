import {
  AddressInfoInterface,
  ContactInfoInterface,
  MobilePhoneNumberPasswordInfoInterface,
  IdentificationInfoInterface,
  PersonalInfoInterface,
  EducationMedicalWorkerInfoInterface,
  PlaceWorkInfoInterface,
} from 'src/app/shared/models';

export interface ChildObjChildNameInterface {
  childObj:
    | AddressInfoInterface
    | ContactInfoInterface
    | MobilePhoneNumberPasswordInfoInterface
    | IdentificationInfoInterface
    | PersonalInfoInterface
    | EducationMedicalWorkerInfoInterface
    | PlaceWorkInfoInterface
    | string
    | number
    | null;
  childName: string;
}
