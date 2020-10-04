import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { WishListItem } from '../models/wishlist.interface';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistItemService {
  private itemSubject = new BehaviorSubject<WishListItem | null>(null);
  private requestInProgressSubject = new BehaviorSubject<boolean>(false);

  public readonly item = this.itemSubject.asObservable();
  public readonly requestInProgress = this.requestInProgressSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private uiService: UiService
  ) {}

  getUserWishlistItem(itemId: string): void {
    this.requestInProgressSubject.next(true);

    this.db
      .doc<WishListItem>(`wishItems/${itemId}`)
      .valueChanges()
      .subscribe(
        (item) => {
          if (item) {
            this.itemSubject.next(item);
            this.requestInProgressSubject.next(false);
          }
        },
        (error) => {
          console.error(error);
          this.requestInProgressSubject.next(false);
          this.uiService.showSnackbar('Failed to load data');
        }
      );
  }

  updateItem(item: WishListItem): Promise<void> {
    const payload: Partial<WishListItem> = {
      name: item.name,
      url: item.url,
      note: item.note,
      // @ts-ignore
      updatedAt: new Date(),
    };

    return this.db.collection('wishItems').doc(item.id).update(payload);
  }

  deleteItem(itemId: string): Promise<void> {
    return this.db.collection('wishItems').doc(itemId).delete();
  }
}
