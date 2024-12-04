import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  implements OnInit {
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      firstname:new FormControl(null, [Validators.required]),
      lastname:new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required]),
      retypePassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      age: new FormControl(null,[Validators.required]),
      gender: new FormControl(null,[Validators.required]),
      address: new FormControl(null),
      city: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required]),
      birthDate: new FormControl(null,[Validators.required]),
      terms: new FormControl(null,[Validators.required]),
      role:new FormControl(null,[Validators.required])
    },);
    console.log(this.myForm);
    
  }
  onSubmit() {
    console.log(this.myForm);
  }

}
