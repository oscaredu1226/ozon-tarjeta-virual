import { computed, inject, Injectable, signal } from '@angular/core';
import { DoctorProfile } from '../../domain/models/doctor-profile.model';
import { DOCTOR_PROFILE_REPOSITORY } from './doctor-profile.repository-token';
export type ContactActionId = 'whatsapp' | 'appointment' | 'phone' | 'location';
export interface ContactAction {
  readonly id: ContactActionId;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string | null;
  readonly external: boolean;
}
@Injectable()
export class DoctorProfileService {
  private readonly repository = inject(DOCTOR_PROFILE_REPOSITORY);
  private readonly currentProfile = signal<DoctorProfile | null>(null);
  readonly profile = this.currentProfile.asReadonly();
  readonly failed = signal(false);
  readonly loading = signal(true);
  private pendingLoad: Promise<void> | null = null;
  readonly actions = computed<readonly ContactAction[]>(() => {
    const profile = this.profile();
    return [
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        subtitle: 'Escríbeme ahora',
        external: true,
        href: profile?.whatsapp
          ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, quisiera información sobre una consulta.')}`
          : null,
      },
      {
        id: 'appointment',
        title: 'Agendar cita',
        subtitle: 'Coordina por WhatsApp',
        external: true,
        href: profile?.appointmentUrl ?? null,
      },
      {
        id: 'phone',
        title: 'Llamar',
        subtitle: 'Hablemos de tu salud',
        external: false,
        href: profile?.phone ? `tel:${profile.phone.replace(/[^+\d]/g, '')}` : null,
      },
      {
        id: 'location',
        title: 'Ubicación',
        subtitle: 'Cómo llegar al consultorio',
        external: true,
        href: profile?.mapUrl ?? null,
      },
    ];
  });
  readonly phoneHref = computed(
    () => this.actions().find((action) => action.id === 'phone')?.href ?? null,
  );
  constructor() {
    void this.load();
  }
  load(): Promise<void> {
    if (this.pendingLoad) return this.pendingLoad;
    this.failed.set(false);
    this.loading.set(true);
    this.pendingLoad = Promise.resolve().then(() => this.fetchProfile());
    return this.pendingLoad;
  }
  private async fetchProfile(): Promise<void> {
    this.failed.set(false);
    this.loading.set(true);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const timeout = new Promise<DoctorProfile>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Profile load timed out')), 10000);
      });
      this.currentProfile.set(await Promise.race([this.repository.getProfile(), timeout]));
    } catch {
      this.failed.set(true);
    } finally {
      clearTimeout(timer);
      this.loading.set(false);
      this.pendingLoad = null;
    }
  }
}
