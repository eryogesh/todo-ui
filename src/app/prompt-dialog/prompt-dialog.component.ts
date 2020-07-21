import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent implements OnInit {
  inputValue: string;
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<PromptDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PromptDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Close the dialog, return value
    this.dialogRef.close(this.inputValue);
  }

  onCancel(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  disableSubmit(): boolean {
    return this.inputValue ? false : true;
  }
}

/**
 * Class to represent prompt dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class PromptDialogModel {

  constructor(public title: string, public message: string) {
  }
}
