import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './core/layout/layout.component';
import { UnauthorizedLayoutComponent } from './core/unauthorized-layout/unauthorized-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/wishlist/wishlist.module').then(
        (m) => m.WishlistModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'profiles',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/profiles/profiles.module').then(
        (m) => m.ProfilesModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'auth',
    component: UnauthorizedLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shopping-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
