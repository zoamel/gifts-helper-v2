import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../../services/auth.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signingIn = false;
  error: string | null = null;
  userSub: Subscription | undefined;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
      console.error(error.message);
      this.error = error.message;
    });
  }

  loginWithEmail(): void {
    if (this.loginForm.valid) {
      this.signingIn = true;

      const { email, password } = this.loginForm.value;
      this.authService.emailSignin(email, password).catch((error) => {
        this.signingIn = false;
        console.error(error.message);
        this.error = error.message;
      });
    }
  }
}
