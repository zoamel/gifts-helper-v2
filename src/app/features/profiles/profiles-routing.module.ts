import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesListComponent } from './screens/profiles-list/profiles-list.component';
import { ProfileWishlistComponent } from './screens/profile-wishlist/profile-wishlist.component';
import { ProfileItemViewComponent } from './screens/profile-item-view/profile-item-view.component';
import { ObservedProfilesComponent } from './screens/observed-profiles/observed-profiles.component';

const routes: Routes = [
  { path: 'search', component: ProfilesListComponent },
  {
    path: 'observed',
    component: ObservedProfilesComponent,
  },
  {
    path: ':id',
    component: ProfileWishlistComponent,
  },
  { path: ':id/item/:itemId', component: ProfileItemViewComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
