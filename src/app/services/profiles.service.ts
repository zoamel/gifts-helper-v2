import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { User } from '../models/user.interface';
import { WishListItem } from '../models/wishlist.interface';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profilesSubject = new BehaviorSubject<User[] | null>(null);
  private profileWishlistSubject = new BehaviorSubject<WishListItem[]>([]);
  private requestInProgressSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public readonly profiles = this.profilesSubject.asObservable();
  public readonly profileWishlist = this.profileWishlistSubject.asObservable();
  public readonly requestInProgress = this.requestInProgressSubject.asObservable();
  public readonly error = this.errorSubject.asObservable();

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  searchForUser(email: string): void {
    this.requestInProgressSubject.next(true);

    this.db
      .collection<User>('users', (ref) => ref.where('email', '==', email))
      .valueChanges({ idField: 'uid' })
      .subscribe(
        (users) => {
          this.requestInProgressSubject.next(false);
          this.profilesSubject.next(users);
        },
        () => {
          this.requestInProgressSubject.next(false);
          console.error('Could not load profiles');
        }
      );
  }

  getProfileWishlist(profileId: string): void {
    this.requestInProgressSubject.next(true);

    this.db
      .collection<WishListItem>('wishItems', (ref) =>
        ref.where('createdBy.uid', '==', profileId).where('public', '==', true)
      )
      .valueChanges({ idField: 'id' })
      .subscribe(
        (listItems) => {
          this.requestInProgressSubject.next(false);
          this.profileWishlistSubject.next(listItems);
        },
        () => {
          this.requestInProgressSubject.next(false);
          console.error('Could not get profile list');
        }
      );
  }

  assignUser(itemId: string, userId: string): void {
    this.db
      .collection<WishListItem>('wishItems')
      .doc(itemId)
      .update({
        assignedUsers: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => {
        this.uiService.showSnackbar('Item assigned to you');
      });
  }

  unassignUser(itemId: string, userId: string): void {
    this.db
      .collection<WishListItem>('wishItems')
      .doc(itemId)
      .update({
        assignedUsers: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      .then(() => {
        this.uiService.showSnackbar('Item unassigned');
      });
  }
}
