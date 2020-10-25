import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../models/user.interface';
import { ProfilesService } from '../../../../services/profiles.service';

@Component({
  selector: 'app-observed-profiles',
  templateUrl: './observed-profiles.component.html',
  styleUrls: ['./observed-profiles.component.scss'],
})
export class ObservedProfilesComponent {
  observedProfiles$: Observable<User[] | null>;

  constructor(private profilesService: ProfilesService) {
    this.observedProfiles$ = profilesService.observedProfiles;
  }
}
