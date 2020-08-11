import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WishListItem } from '../models/wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getUserWishList(): Observable<WishListItem[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<WishListItem>('wishItems', (ref) =>
              ref.where('createdBy.uid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  async addItem(data: Partial<WishListItem>): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;

    return this.db.collection('wishItems').add({
      ...data,
      updatedAt: new Date(),
      createdBy: {
        displayName: user?.displayName,
        uid: user?.uid,
      },
    });
  }
}
