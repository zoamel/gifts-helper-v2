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
  @Input() selectedProfile: User | null | undefined;
  @Input() isObserved = false;

  @Output() saveItem = new EventEmitter<WishListItem>();
  @Output() removeItem = new EventEmitter<WishListItem>();
  @Output() addProfileToObserved = new EventEmitter<User>();
  @Output() removeProfileFromObserved = new EventEmitter<User>();

  ngOnInit(): void {}

  get isVisitor(): boolean {
    return this.mode === 'visitor';
  }

  isItemAssigned(listItem: WishListItem): boolean {
    if (listItem.assignedUsers && this.currentUser) {
      return listItem.assignedUsers.includes(this.currentUser.uid);
    } else {
      return false;
    }
  }

  isSomeoneBuying(listItem: WishListItem): boolean {
    if (
      listItem.assignedUsers &&
      listItem.assignedUsers.length !== 0 &&
      this.currentUser
    ) {
      return (
        listItem.assignedUsers.length > 1 ||
        !listItem.assignedUsers.includes(this.currentUser.uid)
      );
    } else {
      return false;
    }
  }

  observeProfile(profile: User): void {
    this.addProfileToObserved.emit(profile);
  }

  unObserveProfile(profile: User): void {
    this.removeProfileFromObserved.emit(profile);
  }

  assignItem(item: WishListItem): void {
    this.saveItem.emit(item);
  }

  unassignItem(item: WishListItem): void {
    this.removeItem.emit(item);
  }
}
