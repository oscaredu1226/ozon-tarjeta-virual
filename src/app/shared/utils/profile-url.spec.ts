import { resolveProfileUrl } from './profile-url';

describe('QR destination', () => {
  it('uses the public canonical URL and always opens the profile root', () => {
    expect(
      resolveProfileUrl(
        'https://deploy-preview--ozon.netlify.app/otro?utm_source=qr#contacto',
        'https://tarjetapersonal-ozon.netlify.app/perfil',
      ),
    ).toBe('https://tarjetapersonal-ozon.netlify.app/');
  });

  it('uses the current site when the canonical URL is relative or absent', () => {
    expect(resolveProfileUrl('https://clinic.example/otro?x=1#footer', '/')).toBe(
      'https://clinic.example/',
    );
    expect(resolveProfileUrl('http://localhost:4200/perfil?x=1', null)).toBe(
      'http://localhost:4200/',
    );
  });

  it('falls back to the current site for invalid canonical destinations', () => {
    for (const canonical of ['javascript:alert(1)', 'https://user:pass@example.com', 'https://[']) {
      expect(resolveProfileUrl('https://clinic.example/profile', canonical)).toBe(
        'https://clinic.example/',
      );
    }
  });
});
