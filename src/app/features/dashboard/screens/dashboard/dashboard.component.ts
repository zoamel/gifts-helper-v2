import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WishlistService } from '../../../../services/wishlist.service';
import { AuthService } from '../../../../services/auth.service';
import { WishListItem } from '../../../../models/wishlist.interface';
import { User } from '../../../..//models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemsToBuy$: Observable<Record<string, WishListItem[]>>;
  requestInProgress$: Observable<boolean>;
  numberOfItems$: Observable<number>;
  user$: Observable<User | null | undefined>;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$;

    this.requestInProgress$ = wishlistService.requestInProgress;

    this.numberOfItems$ = wishlistService.itemsToBuy.pipe(
      map((items) => items.length)
    );

    this.itemsToBuy$ = wishlistService.itemsToBuy.pipe(
      map((items) => {
        return items.reduce<Record<string, WishListItem[]>>(
          (result, currentValue) => {
            if (!result[currentValue.createdBy.uid]) {
              result[currentValue.createdBy.uid] = [];
            }
            result[currentValue.createdBy.uid].push(currentValue);

            return result;
          },
          {}
        );
      })
    );
  }

  ngOnInit(): void {
    this.wishlistService.getItemsToBuy();
  }

  handleMarkItemAsBought(item: WishListItem): void {
    if (item.bought) {
      this.wishlistService.unMarkItemAsBought(item.id);
    } else {
      this.wishlistService.markItemAsBought(item.id);
    }
  }

  unassignFromItem(item: WishListItem): void {
    this.wishlistService.unassignFromItem(item.id);
  }
}
