import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private dataservice: UserService,private router:Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthdate: new FormControl(null, [Validators.required]), // Added custom validator
      gender: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      role: new FormControl(null, [Validators.required]),
      // status:new FormControl(null),
    },);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      console.error('Form is invalid!');
      return;
    }

    // Prepare the payload
    const payload = {
      ...this.myForm.value,
      birthdate: this.formatDate(this.myForm.value.birthdate) // Ensure correct date format
    };

    console.log(this.myForm.value);

    this.dataservice.signup(payload).subscribe({
      next: (data) => {
        console.log('Sign up successful:', data);
        this.router.navigate(['/login']);

      },
      error: (error) => {
        console.error('Sign up error:', error);
      }
    });
  }

  // Helper method to format the birthdate
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Ensure 2 digits
    const day = (`0${d.getDate()}`).slice(-2); // Ensure 2 digits
    return `${year}-${month}-${day}`;
  }
}
