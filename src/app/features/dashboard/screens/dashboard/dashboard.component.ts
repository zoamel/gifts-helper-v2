import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WishlistService } from '../../../../services/wishlist.service';
import { WishListItem } from '../../../../models/wishlist.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemsToBuy$: Observable<Record<string, WishListItem[]>>;
  requestInProgress$: Observable<boolean>;

  constructor(private wishlistService: WishlistService) {
    this.requestInProgress$ = wishlistService.requestInProgress;

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
