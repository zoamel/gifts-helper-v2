import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const createProfile = functions
  .region('europe-west3')
  .auth.user()
  .onCreate((userRecord, context) => {
    return admin.firestore().doc(`/users/${userRecord.uid}`).set(
      {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
      },
      { merge: true }
    );
  });
