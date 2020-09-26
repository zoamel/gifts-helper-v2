import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user.interface';
import { WishListItem } from '../models/wishlist.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profilesSubject = new BehaviorSubject<User[] | null>(null);
  private observedProfilesSubject = new BehaviorSubject<User[] | null>(null);
  private selectedProfileSubject = new BehaviorSubject<User | null>(null);
  private profileWishlistSubject = new BehaviorSubject<WishListItem[]>([]);
  private requestInProgressSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public readonly profiles = this.profilesSubject.asObservable();
  public readonly observedProfiles = this.observedProfilesSubject.asObservable();
  public readonly selectedProfile = this.selectedProfileSubject.asObservable();
  public readonly profileWishlist = this.profileWishlistSubject.asObservable();
  public readonly requestInProgress = this.requestInProgressSubject.asObservable();
  public readonly error = this.errorSubject.asObservable();

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

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

  getProfileData(profileId: string): void {
    this.db
      .doc<User>(`users/${profileId}`)
      .valueChanges()
      .subscribe(
        (user) => {
          if (user) {
            this.selectedProfileSubject.next(user);
          }
        },
        () => {
          console.error('Could not get profile data');
        }
      );
  }

  getProfileWishlist(profileId: string): void {
    this.requestInProgressSubject.next(true);

    this.db
      .collection<WishListItem>('wishItems', (ref) =>
        ref
          .where('createdBy.uid', '==', profileId)
          .where('public', '==', true)
          .where('bought', '==', false)
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
      });
  }

  unassignUser(itemId: string, userId: string): void {
    this.db
      .collection<WishListItem>('wishItems')
      .doc(itemId)
      .update({
        assignedUsers: firebase.firestore.FieldValue.arrayRemove(userId),
      });
  }

  observeProfile(profile: User): void {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.db.doc(`users/${user.uid}`).update({
          observedProfiles: firebase.firestore.FieldValue.arrayUnion(profile),
        });
      }
    });
  }

  unObserveProfile(profile: User): void {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.db.doc(`users/${user.uid}`).update({
          observedProfiles: firebase.firestore.FieldValue.arrayRemove(profile),
        });
      }
    });
  }

  getObservedProfiles(): void {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.db
          .doc<User>(`users/${user.uid}`)
          .valueChanges()
          .subscribe((userData) => {
            if (userData) {
              this.observedProfilesSubject.next(userData.observedProfiles);
            }
          });
      }
    });
  }
}
