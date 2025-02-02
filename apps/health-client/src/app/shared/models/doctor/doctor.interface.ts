import {
  PatientInterface,
  AddressInfoInterface,
} from 'src/app/shared/models/patient/patient.interface';

// Интерфейс информации о медицинском образовании
export interface EducationMedicalWorkerInfoInterface {
  id: string | null;
  faculty: string;
  licenseNumberMedicalActivities: string;
  nameEducationalInstitution: string;
  numberDiplomaHigherMedicalEducation: string;
  specialistCertificateNumber: string;
  speciality: string;
  specialization: string;
}

// Интерфейс места работы
export interface PlaceWorkInfoInterface {
  id: string | null;
  currentSpecialization: string;
  department: string;
  nameMedicalInstitution: string;
}

// Интерфейс врача, расширяющий пациента, объединяющий все подинтерфейсы
export interface DoctorInterface extends PatientInterface {
  addressMedicalInstitutionInfo: AddressInfoInterface;
  educationMedicalWorkerInfo: EducationMedicalWorkerInfoInterface;
  placeWorkInfo: PlaceWorkInfoInterface;
}
