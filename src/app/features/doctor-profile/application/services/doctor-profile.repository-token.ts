import { InjectionToken } from '@angular/core';
import { DoctorProfileRepository } from '../../domain/interfaces/doctor-profile.repository';
export const DOCTOR_PROFILE_REPOSITORY = new InjectionToken<DoctorProfileRepository>(
  'DoctorProfileRepository',
);
