import { UserBaseInterface } from 'src/app/shared/models/patient.interface';

interface DoctorBaseInterface extends UserBaseInterface {
  addressMedicalInstitutionInfo: {
    city: string;
    district: string;
    house: number;
    housing: number | null;
    region: string;
    street: string;
  };
  educationMedicalWorkerInfo: {
    faculty: string;
    licenseNumberMedicalActivities: string;
    nameEducationalInstitution: string;
    numberDiplomaHigherMedicalEducation: string;
    specialistCertificateNumber: string;
    speciality: string;
    specialization: string;
  };
  placeWorkInfo: {
    currentSpecialization: string;
    department: string;
    nameMedicalInstitution: string;
  };
}

export interface DoctorRequestInterface {
  user: DoctorBaseInterface & {
    contactInfo: DoctorBaseInterface['contactInfo'] & {
      password: string;
    };
  };
}

export interface DoctorResponseInterface {
  id: string;
  user: DoctorBaseInterface;
}
