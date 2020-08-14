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

  async addItem(data: Partial<WishListItem>): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;

    return this.db.collection('wishItems').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        displayName: user?.displayName,
        uid: user?.uid,
      },
    });
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
