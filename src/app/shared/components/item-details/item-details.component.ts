import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { WishListItem } from '../../../models/wishlist.interface';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: WishListItem | null = null;
  @Input() mode: 'owner' | 'visitor' = 'visitor';
  @Input() itemAssigned = false;
  @Input() someoneIsBuying = false;

  @Output() delete = new EventEmitter<WishListItem>();
  @Output() openEdit = new EventEmitter<WishListItem>();
  @Output() assignItem = new EventEmitter<WishListItem>();
  @Output() unAssignItem = new EventEmitter<WishListItem>();

  deleteConfirmationVisible = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDeleteConfirmation(): void {
    this.deleteConfirmationVisible = !this.deleteConfirmationVisible;
  }

  handleOpenEdit(): void {
    if (this.item) {
      this.openEdit.emit(this.item);
    }
  }

  handleDelete(): void {
    if (this.item) {
      this.delete.emit(this.item);
    }
  }

  handleAssignItem(): void {
    if (this.item) {
      this.assignItem.emit(this.item);
    }
  }

  handleUnAssignItem(): void {
    if (this.item) {
      this.unAssignItem.emit(this.item);
    }
  }
}
