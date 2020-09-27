import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { FeedbackData } from '../core/feedback-modal/feedback-modal.component';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private uiService: UiService
  ) {}

  async sendFeedback(data: FeedbackData): Promise<void> {
    const user = await this.afAuth.currentUser;

    await this.db.collection('feedback').add({
      ...data,
      sentBy: {
        displayName: user?.displayName,
        uid: user?.uid,
      },
    });

    this.uiService.showSnackbar('Feedback sent');
  }
}
