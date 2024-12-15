import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder) {
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
}
