import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSearchComponent } from './screens/profile-search/profile-search.component';
import { ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
  declarations: [ProfileSearchComponent],
  imports: [CommonModule, ProfilesRoutingModule],
})
export class ProfilesModule {}
