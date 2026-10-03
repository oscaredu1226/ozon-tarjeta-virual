import { Provider } from '@angular/core';
import { DoctorProfileService } from './application/services/doctor-profile.service';
import { DOCTOR_PROFILE_REPOSITORY } from './application/services/doctor-profile.repository-token';
import { MockDoctorProfileRepository } from './infrastructure/repositories/mock-doctor-profile.repository';
export const DOCTOR_PROFILE_PROVIDERS: Provider[] = [
  DoctorProfileService,
  { provide: DOCTOR_PROFILE_REPOSITORY, useClass: MockDoctorProfileRepository },
];
