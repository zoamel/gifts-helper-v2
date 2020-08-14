import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { urlRegexPattern } from '../../shared/constants';
import { WishlistDialogData } from '../../shared/interfaces';

@Component({
  selector: 'app-wishlist-item-edit',
  templateUrl: './wishlist-item-edit.component.html',
  styleUrls: ['./wishlist-item-edit.component.scss'],
})
export class WishlistItemEditComponent {
  editItemForm = this.fb.group({
    name: [this.data.name, Validators.required],
    url: [this.data.url, Validators.pattern(urlRegexPattern)],
    note: [this.data.note, Validators.maxLength(160)],
    public: true,
  });

  get name(): AbstractControl | null {
    return this.editItemForm.get('name');
  }

  get url(): AbstractControl | null {
    return this.editItemForm.get('url');
  }

  get note(): AbstractControl | null {
    return this.editItemForm.get('note');
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WishlistItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WishlistDialogData
  ) {}

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleSaveItem(): void {
    if (this.editItemForm.valid) {
      this.dialogRef.close(this.editItemForm.value);
    }
  }
}
