import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ProfilesService } from '../../../../services/profiles.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.interface';
import { WishListItem } from '../../../../models/wishlist.interface';

@Component({
  selector: 'app-profile-wishlist',
  templateUrl: './profile-wishlist.component.html',
  styleUrls: ['./profile-wishlist.component.scss'],
})
export class ProfileWishlistComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;
  private profileDataSubscription: Subscription | undefined;
  private authUserSubscription: Subscription | undefined;
  wishListItems$: Observable<WishListItem[]> | undefined;
  profileData$: Observable<User | null> | undefined;
  authUser: User | null | undefined;
  profileData: User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private profilesService: ProfilesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.wishListItems$ = this.profilesService.profileWishlist;
    this.profileData$ = this.profilesService.selectedProfile;

    this.authUserSubscription = this.authService.user$.subscribe((user) => {
      this.authUser = user;
    });

    this.routerSubscription = this.route.params.subscribe((params: Params) => {
      this.profilesService.getProfileWishlist(params.id);
      this.profilesService.getProfileData(params.id);
    });

    this.profileDataSubscription = this.profileData$.subscribe(
      (profileData) => {
        this.profileData = profileData;
      }
    );
  }

  get isObserved(): boolean {
    const found = this.authUser?.observedProfiles?.find(
      (profile) => profile.uid === this.profileData?.uid
    );

    return !!found;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.profileDataSubscription?.unsubscribe();
    this.authUserSubscription?.unsubscribe();
  }

  isItemAssigned(listItem: WishListItem): boolean {
    if (listItem.assignedUsers && this.authUser) {
      return listItem.assignedUsers.includes(this.authUser.uid);
    } else {
      return false;
    }
  }

  observeProfile(profile: User): void {
    if (this.authUser) {
      this.profilesService.observeProfile(profile);
    }
  }

  unObserveProfile(profile: User): void {
    if (this.authUser) {
      this.profilesService.unObserveProfile(profile);
    }
  }
}
