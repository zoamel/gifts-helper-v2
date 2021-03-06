import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { WishListItem } from '../models/wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private itemsToBuySubject = new BehaviorSubject<WishListItem[]>([]);
  private requestInProgressSubject = new BehaviorSubject<boolean>(false);

  public readonly itemsToBuy = this.itemsToBuySubject.asObservable();
  public readonly requestInProgress = this.requestInProgressSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getUserWishList(): Observable<WishListItem[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<WishListItem>('wishItems', (ref) =>
              ref
                .where('createdBy.uid', '==', user.uid)
                .orderBy('createdAt', 'desc')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  getItemsToBuy(): void {
    this.requestInProgressSubject.next(true);

    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.db
          .collection<WishListItem>('wishItems', (ref) =>
            ref.where('assignedUsers', 'array-contains', user.uid)
          )
          .valueChanges({ idField: 'id' })
          .subscribe((items) => {
            this.itemsToBuySubject.next(items);
            this.requestInProgressSubject.next(false);
          });
      }
    });
  }

  async addItem(data: Partial<WishListItem>): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;

    return this.db.collection('wishItems').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      bought: false,
      createdBy: {
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
      },
    });
  }

  async markItemAsBought(itemId: string): Promise<void> {
    const user = await this.afAuth.currentUser;

    return this.db.collection('wishItems').doc(itemId).update({
      bought: true,
      boughtBy: user?.uid,
    });
  }

  unMarkItemAsBought(itemId: string): Promise<void> {
    return this.db.collection('wishItems').doc(itemId).update({
      bought: false,
      boughtBy: null,
    });
  }

  async unassignFromItem(itemId: string): Promise<void> {
    const user = await this.afAuth.currentUser;

    return this.db
      .collection<WishListItem>('wishItems')
      .doc(itemId)
      .update({
        assignedUsers: firebase.firestore.FieldValue.arrayRemove(user?.uid),
      });
  }
}
