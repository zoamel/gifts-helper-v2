import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public angularFireAuth: AngularFireAuth,
    public authService: AuthService,
    private feedbackService: FeedbackService,
    public dialog: MatDialog
  ) {}

  openFeedbackDialog(): void {
    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      width: '480px',
      minHeight: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.feedbackService.sendFeedback(result);
      }
    });
  }

  logout(): void {
    this.authService.signOut().then(() => {
      window.location.reload();
    });
  }
}
