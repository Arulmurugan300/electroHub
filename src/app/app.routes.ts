import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';

export const routes: Routes = [
  { path: 'sign-in', loadComponent:()=>import('./auth/components/sign-in/sign-in.component').then(m=>m.SignInComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard-design/components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate:[AuthGuardService] }
];
