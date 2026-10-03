import { TestBed } from '@angular/core/testing';
import { BrandLogoComponent } from './brand-logo.component';

describe('Brand image fallback', () => {
  it('keeps the brand readable when its image cannot load', async () => {
    await TestBed.configureTestingModule({ imports: [BrandLogoComponent] }).compileComponents();
    const fixture = TestBed.createComponent(BrandLogoComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector('img')?.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(element.querySelector('.brand-fallback')?.textContent).toContain('OZON');
    expect(element.querySelector('img')).toBeNull();
  });
});
