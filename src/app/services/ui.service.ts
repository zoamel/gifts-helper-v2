import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackBarService: MatSnackBar) {}

  showSnackbar(message: string): void {
    this.snackBarService.open(message, 'Close', {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
