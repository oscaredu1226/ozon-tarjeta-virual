import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('Digital medical card', () => {
  it('redirects unknown nested routes to the home profile', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/otro/perfil/inexistente');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Oscar Juan Soto Caminada',
    );
  });

  it('loads the profile on the home route with four contact actions and three services', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Oscar Juan Soto Caminada');
    expect(element.querySelectorAll('app-doctor-actions a')).toHaveLength(4);
    expect(element.querySelectorAll('app-service-card')).toHaveLength(3);
    expect(element.querySelector('a[href="tel:+51959281145"]')).toBeTruthy();
    expect(
      element.querySelector(
        'app-doctor-actions a[href="https://maps.app.goo.gl/qJ1h4nhepdk7JgaQ7"]',
      ),
    ).toBeTruthy();
    expect(element.querySelectorAll('app-service-card button')).toHaveLength(0);
    expect(element.querySelectorAll('app-service-card .service-detail')).toHaveLength(3);
    expect(element.querySelector('.page-meta')).toBeNull();
  });
});

describe('Application startup recovery', () => {
  it('shows a reload action if a route bundle cannot load', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: '', loadComponent: () => Promise.reject(new Error('failed chunk')) },
        ]),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await expect(TestBed.inject(Router).navigateByUrl('/')).rejects.toThrow('failed chunk');
    await fixture.whenStable();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-startup-loader [role="alert"]')).toBeTruthy();
    expect(element.querySelector('.boot-retry')?.textContent).toContain('Volver a cargar');
  });
});
