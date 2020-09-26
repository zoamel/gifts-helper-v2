import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../models/user.interface';
import { ProfilesService } from '../../../../services/profiles.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
})
export class ProfilesListComponent implements OnInit {
  profiles$: Observable<User[] | null>;
  observedProfiles$: Observable<User[] | null>;
  requestInProgress$: Observable<boolean>;
  searchPhraseSubmitted = false;

  constructor(private profilesService: ProfilesService) {
    this.profiles$ = profilesService.profiles;
    this.observedProfiles$ = profilesService.observedProfiles;
    this.requestInProgress$ = profilesService.requestInProgress;
  }

  ngOnInit(): void {
    this.profilesService.getObservedProfiles();
  }

  handleSearchSubmit(value: string): void {
    this.searchPhraseSubmitted = true;
    this.profilesService.searchForUser(value);
  }
}
