import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/doctor-profile/presentation/pages/doctor-profile-page/doctor-profile-page.component').then(
        (m) => m.DoctorProfilePageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
