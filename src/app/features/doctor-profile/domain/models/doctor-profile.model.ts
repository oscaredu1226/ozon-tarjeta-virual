export type ServiceCategory = 'ozone' | 'pain' | 'consultation';
export type SocialNetworkType = 'instagram' | 'facebook' | 'linkedin';
export interface DoctorService {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly detail: string;
  readonly category: ServiceCategory;
}
export interface SocialNetwork {
  readonly type: SocialNetworkType;
  readonly label: string;
  readonly url: string | null;
}
export interface DoctorProfile {
  readonly id: string;
  readonly name: string;
  readonly specialty: string;
  readonly cmp: string;
  readonly headline: string;
  readonly introduction: string;
  readonly photo: string | null;
  readonly logo: string;
  readonly location: string;
  readonly mapUrl: string | null;
  readonly phoneLabel: string;
  /** International format; null until the actual number is supplied. */
  readonly phone: string | null;
  readonly whatsapp: string | null;
  readonly appointmentUrl: string | null;
  readonly socialNetworks: readonly SocialNetwork[];
  readonly services: readonly DoctorService[];
}
