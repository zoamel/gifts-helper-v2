import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./features/wishlist/wishlist.module').then(
        (m) => m.WishlistModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('./features/profiles/profiles.module').then(
        (m) => m.ProfilesModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./features/faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
