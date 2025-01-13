import { Component } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-reservation-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Reservation Successful</h2>
    <mat-dialog-content>Your seats have been reserved successfully!</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `,
})
export class ReservationConfirmationDialogComponent {}
