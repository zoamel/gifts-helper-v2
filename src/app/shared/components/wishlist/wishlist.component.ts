import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { WishListItem } from '../../../models/wishlist.interface';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @Input() data: WishListItem[] = [];
  @Input() mode: 'owner' | 'visitor' = 'visitor';
  @Input() currentUser: User | undefined;

  @Output() saveItem = new EventEmitter<WishListItem>();
  @Output() removeItem = new EventEmitter<WishListItem>();

  ngOnInit(): void {}

  isItemAssigned(listItem: WishListItem): boolean {
    if (listItem.assignedUsers && this.currentUser) {
      return listItem.assignedUsers.includes(this.currentUser.uid);
    } else {
      return false;
    }
  }

  assignItem(item: WishListItem): void {
    this.saveItem.emit(item);
  }

  unassignItem(item: WishListItem): void {
    this.removeItem.emit(item);
  }
}
