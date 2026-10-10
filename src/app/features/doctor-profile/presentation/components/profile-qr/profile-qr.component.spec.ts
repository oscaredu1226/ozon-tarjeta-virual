import { TestBed } from '@angular/core/testing';
import { beforeEach, vi } from 'vitest';
import QRCode from 'qrcode';
import type { QRCodeToDataURLOptions } from 'qrcode';
import { ProfileQrComponent } from './profile-qr.component';

vi.mock('qrcode', () => ({ default: { toDataURL: vi.fn() } }));
const renderQr = vi.mocked(
  QRCode.toDataURL as (text: string, options?: QRCodeToDataURLOptions) => Promise<string>,
);

describe('Profile QR', () => {
  beforeEach(() => renderQr.mockReset());

  it('shows a loading state before providing the QR and its PNG download', async () => {
    let resolveImage!: (image: string) => void;
    renderQr.mockReturnValueOnce(
      new Promise<string>((resolve) => {
        resolveImage = resolve;
      }),
    );
    await TestBed.configureTestingModule({ imports: [ProfileQrComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ProfileQrComponent);
    fixture.detectChanges();
    const generating = fixture.componentInstance.generate();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="status"]')?.getAttribute('aria-label')).toBe(
      'Preparando el código QR',
    );
    const source = 'data:image/png;base64,cXI=';
    // The dynamic import resolves on a microtask before the renderer is called.
    await vi.waitFor(() => expect(QRCode.toDataURL).toHaveBeenCalledOnce());
    resolveImage(source);
    await generating;
    fixture.detectChanges();
    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      fixture.componentInstance.profileUrl,
      expect.objectContaining({ margin: 4, width: 512, errorCorrectionLevel: 'M' }),
    );
    expect(element.querySelector('.qr-image')?.getAttribute('src')).toBe(source);
    expect(element.querySelector('.profile-url')?.getAttribute('href')).toBe(
      fixture.componentInstance.profileUrl,
    );
    expect(element.querySelector('.download-qr')?.getAttribute('download')).toBe(
      'ozon-dr-oscar-soto-qr.png',
    );
    expect(element.querySelector('[role="status"]')).toBeNull();
  });

  it('keeps the profile link available and allows retrying a failed QR', async () => {
    renderQr
      .mockRejectedValueOnce(new Error('failed QR chunk'))
      .mockResolvedValueOnce('data:image/png;base64,cXI=');
    await TestBed.configureTestingModule({ imports: [ProfileQrComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ProfileQrComponent);
    fixture.detectChanges();
    await fixture.componentInstance.generate();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('No pudimos preparar');
    expect(element.querySelector('.profile-url')).toBeTruthy();
    expect(element.querySelector('.download-qr')).toBeNull();
    await fixture.componentInstance.generate();
    fixture.detectChanges();
    expect(element.querySelector('.qr-image')).toBeTruthy();
    expect(element.querySelector('[role="alert"]')).toBeNull();
  });
});
