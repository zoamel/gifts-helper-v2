import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { WishlistDialogData } from '../../shared/interfaces';
import { urlRegexPattern } from '../../shared/constants';

@Component({
  selector: 'app-wishlist-item-add',
  templateUrl: './wishlist-item-add.component.html',
  styleUrls: ['./wishlist-item-add.component.scss'],
})
export class WishlistItemAddComponent {
  newItemForm = this.fb.group({
    name: ['', Validators.required],
    url: ['', Validators.pattern(urlRegexPattern)],
    public: true,
  });

  get name(): AbstractControl | null {
    return this.newItemForm.get('name');
  }

  get url(): AbstractControl | null {
    return this.newItemForm.get('url');
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WishlistItemAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WishlistDialogData
  ) {}

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleAddItem(): void {
    if (this.newItemForm.valid) {
      this.dialogRef.close(this.newItemForm.value);
    }
  }
}
