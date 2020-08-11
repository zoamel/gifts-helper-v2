import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signingIn = false;
  error: string | null = null;
  userSub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      if (user) {
        this.signingIn = false;
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  get progressBarMode(): 'determinate' | 'indeterminate' {
    if (this.signingIn) {
      return 'indeterminate';
    }

    return 'determinate';
  }

  signInWithGoogle(): void {
    this.signingIn = true;

    this.authService.googleSignin().catch((error) => {
      this.signingIn = false;
      console.error(error);
    });
  }
}
