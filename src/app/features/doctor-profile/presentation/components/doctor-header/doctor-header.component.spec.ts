import { TestBed } from '@angular/core/testing';
import { DoctorHeaderComponent } from './doctor-header.component';
import { MOCK_DOCTOR_PROFILE } from '../../../infrastructure/repositories/mock-doctor-profile.repository';

describe('Doctor photograph fallback', () => {
  it('replaces a failed photo with the provisional avatar while retaining profile information', async () => {
    await TestBed.configureTestingModule({ imports: [DoctorHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DoctorHeaderComponent);
    fixture.componentRef.setInput('profile', {
      ...MOCK_DOCTOR_PROFILE,
      photo: 'assets/doctors/missing.jpg',
    });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector('.doctor-photo')?.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(element.querySelector('.photo-placeholder')).toBeTruthy();
    expect(element.querySelector('.doctor-photo')).toBeNull();
    expect(element.querySelector('h1')?.textContent).toContain('Oscar Juan Soto Caminada');
  });
});
