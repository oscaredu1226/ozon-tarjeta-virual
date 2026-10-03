import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StartupLoaderComponent } from './shared/components/startup-loader/startup-loader.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartupLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly animationReady = signal(false);
  private readonly routeReady = signal(this.router.navigated);
  readonly startupFailed = signal(false);
  readonly starting = computed(() => !this.animationReady() || !this.routeReady());
  constructor() {
    const animationTimer = setTimeout(() => this.animationReady.set(true), 650);
    const startupTimer = setTimeout(() => {
      if (!this.routeReady()) this.startupFailed.set(true);
    }, 12000);
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeReady.set(true);
        this.startupFailed.set(false);
        clearTimeout(startupTimer);
      } else if (event instanceof NavigationError) {
        this.startupFailed.set(true);
        clearTimeout(startupTimer);
      }
    });
    if (this.router.navigated) clearTimeout(startupTimer);
    this.destroyRef.onDestroy(() => {
      clearTimeout(animationTimer);
      clearTimeout(startupTimer);
    });
  }
}
