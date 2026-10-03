import { DoctorProfile } from '../models/doctor-profile.model';
export interface DoctorProfileRepository {
  getProfile(): Promise<DoctorProfile>;
}
