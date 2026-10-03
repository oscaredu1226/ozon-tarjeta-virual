import { TestBed } from '@angular/core/testing';
import { DoctorProfilePageComponent } from './doctor-profile-page.component';
import { DoctorProfileService } from '../../../application/services/doctor-profile.service';
import { DOCTOR_PROFILE_REPOSITORY } from '../../../application/services/doctor-profile.repository-token';
import { DoctorProfileRepository } from '../../../domain/interfaces/doctor-profile.repository';
import { DoctorProfile } from '../../../domain/models/doctor-profile.model';
import { MOCK_DOCTOR_PROFILE } from '../../../infrastructure/repositories/mock-doctor-profile.repository';

async function createPage(repository: DoctorProfileRepository) {
  await TestBed.configureTestingModule({ imports: [DoctorProfilePageComponent] })
    .overrideComponent(DoctorProfilePageComponent, {
      set: {
        providers: [
          DoctorProfileService,
          { provide: DOCTOR_PROFILE_REPOSITORY, useValue: repository },
        ],
      },
    })
    .compileComponents();
  const fixture = TestBed.createComponent(DoctorProfilePageComponent);
  fixture.detectChanges();
  return { fixture, loaded: fixture.componentInstance.facade.load() };
}

describe('Profile loading and recovery', () => {
  it('keeps a skeleton visible until the repository resolves, then renders the profile', async () => {
    let resolveProfile!: (profile: DoctorProfile) => void;
    const pending = new Promise<DoctorProfile>((resolve) => {
      resolveProfile = resolve;
    });
    const { fixture, loaded } = await createPage({ getProfile: () => pending });
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-profile-skeleton [aria-busy="true"]')).toBeTruthy();
    expect(element.querySelector('article')).toBeNull();
    resolveProfile(MOCK_DOCTOR_PROFILE);
    await loaded;
    await fixture.whenStable();
    fixture.detectChanges();
    expect(element.querySelector('app-profile-skeleton')).toBeNull();
    expect(element.querySelector('h1')?.textContent).toContain('Oscar Juan Soto Caminada');
  });

  it('shows a branded error and retries through a skeleton before restoring the profile', async () => {
    let attempts = 0;
    let resolveProfile!: (profile: DoctorProfile) => void;
    const pending = new Promise<DoctorProfile>((resolve) => {
      resolveProfile = resolve;
    });
    const { fixture, loaded } = await createPage({
      getProfile: () => (++attempts === 1 ? Promise.reject(new Error('offline')) : pending),
    });
    await loaded;
    await fixture.whenStable();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="alert"] app-brand-logo')).toBeTruthy();
    (element.querySelector('.error-state button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelector('app-profile-skeleton')).toBeTruthy();
    const retried = fixture.componentInstance.facade.load();
    resolveProfile(MOCK_DOCTOR_PROFILE);
    await retried;
    await fixture.whenStable();
    fixture.detectChanges();
    expect(element.querySelector('article')).toBeTruthy();
  });
});
