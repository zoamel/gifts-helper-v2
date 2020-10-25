import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { WishlistItemService } from '../../../../services/wishlist-item.service';
import { WishListItem } from '../../../../models/wishlist.interface';
import { User } from '../../../../models/user.interface';
import { ProfilesService } from '../../../../services/profiles.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-item-view',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  templateUrl: './profile-item-view.component.html',
  styleUrls: ['./profile-item-view.component.scss'],
})
export class ProfileItemViewComponent implements OnInit, OnDestroy {
  requestInProgress$: Observable<boolean>;
  item$: Observable<WishListItem | null>;
  itemId: string | null;
  profileId: string | null;
  authUser: User | null | undefined;
  private authUserSubscription: Subscription | undefined;
  location: Location;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private profilesService: ProfilesService,
    private authService: AuthService,
    private wishlistItemService: WishlistItemService,
    location: Location
  ) {
    this.requestInProgress$ = wishlistItemService.requestInProgress;
    this.item$ = wishlistItemService.item;
    this.itemId = route.snapshot.paramMap.get('itemId');
    this.profileId = route.snapshot.paramMap.get('id');
    this.location = location;
  }

  ngOnInit(): void {
    if (this.itemId) {
      this.wishlistItemService.getUserWishlistItem(this.itemId);
    }

    this.authUserSubscription = this.authService.user$.subscribe((user) => {
      this.authUser = user;
    });
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  isSomeoneBuying(listItem: WishListItem): boolean {
    if (
      listItem.assignedUsers &&
      listItem.assignedUsers.length !== 0 &&
      this.authUser
    ) {
      return (
        listItem.assignedUsers.length > 1 ||
        !listItem.assignedUsers.includes(this.authUser.uid)
      );
    } else {
      return false;
    }
  }

  isItemAssigned(listItem: WishListItem): boolean {
    if (listItem.assignedUsers && this.authUser) {
      return listItem.assignedUsers.includes(this.authUser.uid);
    } else {
      return false;
    }
  }

  assignItem(): void {
    if (this.authUser && this.itemId) {
      this.profilesService.assignUser(this.itemId, this.authUser.uid);
    }
  }

  unassignItem(): void {
    if (this.authUser && this.itemId) {
      this.profilesService.unassignUser(this.itemId, this.authUser.uid);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
