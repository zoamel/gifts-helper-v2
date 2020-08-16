import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesListComponent } from './screens/profiles-list/profiles-list.component';
import { ProfileWishlistComponent } from './screens/profile-wishlist/profile-wishlist.component';

const routes: Routes = [
  { path: '', component: ProfilesListComponent },
  {
    path: ':id',
    component: ProfileWishlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
