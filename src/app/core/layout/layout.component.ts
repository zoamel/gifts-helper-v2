import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { ProfilesService } from '../../services/profiles.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  observedProfiles$: Observable<User[] | null>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private feedbackService: FeedbackService,
    private profilesService: ProfilesService,
    public dialog: MatDialog
  ) {
    this.observedProfiles$ = profilesService.observedProfiles;
  }

  ngOnInit(): void {
    this.profilesService.getObservedProfiles();
  }

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
