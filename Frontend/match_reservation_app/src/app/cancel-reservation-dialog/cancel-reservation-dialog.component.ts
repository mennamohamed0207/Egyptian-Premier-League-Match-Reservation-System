import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  standalone: false,
  selector: 'app-cancel-reservation-dialog',
  templateUrl: './cancel-reservation-dialog.component.html',
  styleUrls: ['./cancel-reservation-dialog.component.css']
})
export class CancelReservationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Send 'true' back to confirm
  }

  onCancel(): void {
    this.dialogRef.close(false); // Send 'false' back to cancel
  }
}
