import { Component, Input } from '@angular/core';

import { User } from '../../../../models/user.interface';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() profile: User | undefined;
}
