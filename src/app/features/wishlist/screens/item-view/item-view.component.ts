import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { WishListItem } from '../../../../models/wishlist.interface';
import { WishlistItemService } from '../../../../services/wishlist-item.service';
import { WishlistItemEditComponent } from '../../components/wishlist-item-edit/wishlist-item-edit.component';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
})
export class ItemViewComponent implements OnInit {
  requestInProgress$: Observable<boolean>;
  item$: Observable<WishListItem | null>;
  itemId: string | null;
  deleteConfirmationVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private wishlistItemService: WishlistItemService
  ) {
    this.requestInProgress$ = wishlistItemService.requestInProgress;
    this.item$ = wishlistItemService.item;
    this.itemId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.itemId) {
      this.wishlistItemService.getUserWishlistItem(this.itemId);
    }
  }

  toggleDeleteConfirmation(): void {
    this.deleteConfirmationVisible = !this.deleteConfirmationVisible;
  }

  handleDeleteItem(): void {
    if (this.itemId) {
      this.wishlistItemService.deleteItem(this.itemId).then(() => {
        this.router.navigate(['/wishlist']);
      });
    }
  }

  showEditItemDialog(item: WishListItem): void {
    if (this.itemId) {
      const dialogRef = this.dialog.open(WishlistItemEditComponent, {
        width: '95%',
        maxWidth: '480px',
        data: {
          ...item,
        },
      });

      dialogRef.afterClosed().subscribe((result: WishListItem) => {
        if (result) {
          const updatedItem = {
            ...item,
            ...result,
            id: this.itemId as string,
          };

          this.wishlistItemService.updateItem(updatedItem);
        }
      });
    }
  }
}
