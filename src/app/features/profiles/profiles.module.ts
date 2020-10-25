import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ProfilesListComponent } from './screens/profiles-list/profiles-list.component';
import { ProfileSearchComponent } from './components/profile-search/profile-search.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfileWishlistComponent } from './screens/profile-wishlist/profile-wishlist.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileItemViewComponent } from './screens/profile-item-view/profile-item-view.component';
import { ObservedProfilesComponent } from './screens/observed-profiles/observed-profiles.component';

@NgModule({
  declarations: [
    ProfilesListComponent,
    ProfileSearchComponent,
    ProfileWishlistComponent,
    ProfileCardComponent,
    ProfileItemViewComponent,
    ObservedProfilesComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, ProfilesRoutingModule],
})
export class ProfilesModule {}
