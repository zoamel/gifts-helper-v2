import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signingIn = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  get progressBarMode(): 'determinate' | 'indeterminate' {
    if (this.signingIn) {
      return 'indeterminate';
    }

    return 'determinate';
  }

  signInWithGoogle(): void {
    this.signingIn = true;

    this.authService
      .googleSignin()
      .then(() => {
        this.signingIn = false;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.signingIn = false;
        console.error(error);
      });
  }
}
