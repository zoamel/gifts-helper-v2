import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WishListItem } from 'src/app/models/wishlist.interface';

import { ProfilesService } from '../../../../services/profiles.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-wishlist',
  templateUrl: './profile-wishlist.component.html',
  styleUrls: ['./profile-wishlist.component.scss'],
})
export class ProfileWishlistComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;
  wishListItems$: Observable<WishListItem[]> | undefined;
  authUser: User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private profilesService: ProfilesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((params: Params) => {
      this.profilesService.getProfileWishlist(params.id);
    });

    this.wishListItems$ = this.profilesService.profileWishlist;

    this.authService.user$.pipe(take(1)).subscribe((user) => {
      this.authUser = user;
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  assignItem(item: WishListItem): void {
    if (this.authUser) {
      this.profilesService.assignUser(item.id, this.authUser.uid);
    }
  }

  unassignItem(item: WishListItem): void {
    if (this.authUser) {
      this.profilesService.unassignUser(item.id, this.authUser.uid);
    }
  }
}
