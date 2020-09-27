import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WishlistService } from '../../../../services/wishlist.service';
import { AuthService } from '../../../../services/auth.service';
import { WishListItem } from '../../../../models/wishlist.interface';
import { User } from '../../../../models/user.interface';

export type ItemsToBuy = Record<string, WishListItem[]>;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemsToBuy$: Observable<ItemsToBuy>;
  requestInProgress$: Observable<boolean>;
  user$: Observable<User | null | undefined>;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$;

    //#region Items to buy
    this.requestInProgress$ = wishlistService.requestInProgress;

    // Convert non-grouped list of wishlist items into one grouped by a user
    this.itemsToBuy$ = wishlistService.itemsToBuy.pipe(
      map((items) => {
        return items.reduce<ItemsToBuy>((result, currentValue) => {
          if (!result[currentValue.createdBy.uid]) {
            result[currentValue.createdBy.uid] = [];
          }
          result[currentValue.createdBy.uid].push(currentValue);

          return result;
        }, {});
      })
    );
    //#endregion
  }

  ngOnInit(): void {
    this.wishlistService.getItemsToBuy();
  }

  listHaveItems(items: ItemsToBuy): boolean {
    return Object.keys(items).length > 0;
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
