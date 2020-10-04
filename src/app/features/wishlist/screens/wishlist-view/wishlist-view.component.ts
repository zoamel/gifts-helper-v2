import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { WishListItem } from '../../../../models/wishlist.interface';
import { WishlistService } from '../../../../services/wishlist.service';
import { WishlistItemAddComponent } from '../../components/wishlist-item-add/wishlist-item-add.component';
import { WishlistItemEditComponent } from '../../components/wishlist-item-edit/wishlist-item-edit.component';

@Component({
  selector: 'app-wishlist-view',
  templateUrl: './wishlist-view.component.html',
  styleUrls: ['./wishlist-view.component.scss'],
})
export class WishlistViewComponent implements OnInit {
  wishList$: Observable<WishListItem[]> | undefined;

  constructor(
    private listsService: WishlistService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.wishList$ = this.listsService.getUserWishList();
  }

  showAddItemDialog(): void {
    const dialogRef = this.dialog.open(WishlistItemAddComponent, {
      width: '95%',
      maxWidth: '480px',
    });

    dialogRef.afterClosed().subscribe((result: WishListItem) => {
      if (result) {
        this.listsService.addItem(result);
      }
    });
  }
}
