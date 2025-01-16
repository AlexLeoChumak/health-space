import { PatientInterface } from 'src/app/shared/models/patient/patient.interface';

export interface DoctorInterface extends PatientInterface {
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
