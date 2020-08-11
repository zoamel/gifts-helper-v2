import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);
  }

  async signOut(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
}
