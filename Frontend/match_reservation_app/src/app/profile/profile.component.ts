import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { CancelReservationDialogComponent } from '../cancel-reservation-dialog/cancel-reservation-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editMode = false;
  user: any;
  reservations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dataService: UserService
  ) {
    // Initialize an empty form
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      city: [''],
      address: [''],
      role: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.dataService.getUser(username).subscribe((data: any) => {
      this.user = data.user;

      // Update the form with the user data
      this.profileForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        birthdate: this.user.birthdate,
        gender: this.user.gender,
        city: this.user.city,
        address: this.user.address,
        role: this.user.role,
      });
    });

    // Fetch reservations from the database
    this.dataService.getReservations().subscribe(
      (data: any) => {
        this.reservations = data.map((reservation: any) => ({
          id: reservation._id,
          homeTeam: reservation.homeTeam,
          awayTeam: reservation.awayTeam,
          stadiumName: reservation.stadiumName,
          eventDate: new Date(reservation.dateTime),
          seat: `Row ${reservation.seatRowIndex}, Seat ${reservation.seatColumnIndex}`,
          mainReferee: reservation.mainReferee,
          linesman1: reservation.linesman1,
          linesman2: reservation.linesman2,
        }));
        console.log('Reservations:', this.reservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );

  }

  resetForm() {
    this.editMode = false; // Exit edit mode
    this.profileForm.patchValue({
      username: 'john_doe',
      email: 'john.doe@example.com',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: '1990-01-01',
      gender: 'male',
      city: 'New York',
      address: '123 Main Street',
      role: 'Fan'
    });
  }

  canCancel(eventDate: Date): boolean {
    const currentDate = new Date();
    const daysBeforeEvent = Math.floor(
      (new Date(eventDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysBeforeEvent >= 3;
  }

  cancelReservation(reservationId: string, reservation: any): void {
    const dialogRef = this.dialog.open(CancelReservationDialogComponent, {
      width: '400px',
      data: {
        eventName: `${reservation.homeTeam} vs ${reservation.awayTeam}`,
        eventDate: reservation.eventDate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Logic to cancel the reservation
        const reservationIndex = this.reservations.findIndex(
          (r) => r.id === reservationId
        );
        if (reservationIndex !== -1) {
          this.reservations.splice(reservationIndex, 1);
          console.log('Reservation canceled successfully!');
        }
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.getRawValue();
      const username = this.profileForm.get('username')?.value; // Get the username from the form
      updatedProfile.birthdate = new Date(updatedProfile.birthdate);
      this.dataService.updateProfile(username, updatedProfile).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.editMode = false; // Exit edit mode
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}
