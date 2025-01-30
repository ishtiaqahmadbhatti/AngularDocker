import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./app_modules/home/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'secure/:encryptedData',
    loadComponent: () => import('../app/app_modules/convert/pdf-to-word/pdf-to-word.component').then(c => c.PdfToWordComponent)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./app_modules/authentication/authentication.routes').then(r =>r.AuthenticatioRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => import('./app_modules/profile/profile.routes').then(r => r.ProfileRoutes),
  },
  {
    path: 'verification',
    loadChildren: () => import('./app_modules/verification/verification.routes').then(r => r.VerificationRoutes),
  },
  {
    path: 'convert',
    loadChildren: () => import('./app_modules/convert/convert.routes').then(r => r.ConvertRoutes),
  }
];
