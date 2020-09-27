import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeedbackData {
  type: 'feedback' | 'bug';
  message: string;
}

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm = this.fb.group({
    type: ['feedback', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackData
  ) {}

  get type(): AbstractControl | null {
    return this.feedbackForm.get('type');
  }

  get message(): AbstractControl | null {
    return this.feedbackForm.get('message');
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleSubmit(): void {
    if (this.feedbackForm.valid) {
      this.dialogRef.close(this.feedbackForm.value);
    }
  }
}
