import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CancelReservationDialogComponent } from '../cancel-reservation-dialog/cancel-reservation-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      username: [{ value: 'john_doe', disabled: true }],
      email: [{ value: 'john.doe@example.com', disabled: true }],
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      birthDate: ['1990-01-01', Validators.required],
      gender: ['male', Validators.required],
      city: ['New York'],
      address: ['123 Main Street'],
      role: [{ value: 'Fan', disabled: true }],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.getRawValue();
      console.log('Updated Profile:', updatedProfile);
      this.editMode = false; // Exit edit mode
    }
  }

  resetForm() {
    this.editMode = false; // Exit edit mode
    this.profileForm.reset({
      username: 'john_doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      gender: 'male',
      city: 'New York',
      address: '123 Main Street',
      role: 'Fan',
    });
  }

  canCancel(eventDate: Date): boolean {
    const currentDate = new Date();
    const daysBeforeEvent = Math.floor(
      (new Date(eventDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysBeforeEvent >= 3;
  }



  cancelReservation(reservationId: number, reservation: any): void {
    const dialogRef = this.dialog.open(CancelReservationDialogComponent, {
      width: '400px',
      data: {
        eventName: reservation.eventName,
        eventDate: reservation.eventDate
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logic to cancel the reservation
        const reservationIndex = this.reservations.findIndex(r => r.id === reservationId);
        if (reservationIndex !== -1) {
          this.reservations.splice(reservationIndex, 1);
          console.log('Reservation canceled successfully!');
        }
      }
    });
  }
  reservations = [
    {
      id: 1,
      eventName: 'Music Concert',
      eventDate: new Date('2024-12-20'),
      seats: ['A1', 'A2']
    },
    {
      id: 2,
      eventName: 'Art Exhibition',
      eventDate: new Date('2024-12-18'),
      seats: ['B5']
    }
  ];

}
