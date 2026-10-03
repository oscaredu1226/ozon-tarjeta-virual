import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DoctorProfileService } from './doctor-profile.service';
import { DOCTOR_PROFILE_REPOSITORY } from './doctor-profile.repository-token';
import { MOCK_DOCTOR_PROFILE } from '../../infrastructure/repositories/mock-doctor-profile.repository';
import { DoctorProfile } from '../../domain/models/doctor-profile.model';

function createService(profile: DoctorProfile): DoctorProfileService {
  TestBed.configureTestingModule({
    providers: [
      DoctorProfileService,
      {
        provide: DOCTOR_PROFILE_REPOSITORY,
        useValue: { getProfile: async () => profile },
      },
    ],
  });
  return TestBed.inject(DoctorProfileService);
}

describe('DoctorProfileService', () => {
  it('keeps contact destinations empty until real data is supplied', async () => {
    const service = createService({
      ...MOCK_DOCTOR_PROFILE,
      mapUrl: null,
      phone: null,
      whatsapp: null,
      appointmentUrl: null,
    });
    await service.load();
    expect(service.actions().every((action) => action.href === null)).toBe(true);
    expect(service.phoneHref()).toBeNull();
  });

  it('adapts repository data into contact actions without changing the presentation', async () => {
    const service = createService({
      ...MOCK_DOCTOR_PROFILE,
      phone: '+51 900 000 000',
      whatsapp: '+51 900 000 000',
      appointmentUrl: 'https://example.com/appointments',
    });
    await service.load();
    expect(service.phoneHref()).toBe('tel:+51900000000');
    expect(service.actions()[0].href).toContain('https://wa.me/51900000000?text=');
    expect(service.actions()[1].href).toBe('https://example.com/appointments');
  });

  it('exposes repository failures for a recoverable error state', async () => {
    TestBed.configureTestingModule({
      providers: [
        DoctorProfileService,
        {
          provide: DOCTOR_PROFILE_REPOSITORY,
          useValue: {
            getProfile: async () => {
              throw new Error('unavailable');
            },
          },
        },
      ],
    });
    const service = TestBed.inject(DoctorProfileService);
    await service.load();
    expect(service.failed()).toBe(true);
    expect(service.profile()).toBeNull();
  });
});

describe('Loading boundaries', () => {
  it('stops the skeleton when a repository never responds', async () => {
    vi.useFakeTimers();
    try {
      TestBed.configureTestingModule({
        providers: [
          DoctorProfileService,
          {
            provide: DOCTOR_PROFILE_REPOSITORY,
            useValue: { getProfile: () => new Promise<DoctorProfile>(() => {}) },
          },
        ],
      });
      const service = TestBed.inject(DoctorProfileService);
      expect(service.loading()).toBe(true);
      await vi.advanceTimersByTimeAsync(10000);
      expect(service.failed()).toBe(true);
      expect(service.loading()).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
