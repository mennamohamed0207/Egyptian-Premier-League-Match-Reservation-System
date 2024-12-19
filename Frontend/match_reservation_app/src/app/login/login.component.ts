import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private userService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Login form is invalid!');
      return;
    }

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    console.log('Login payload:', payload);

    this.userService.login(this.loginForm).subscribe({
      next: (data) => {
        console.log('Login successful:', data);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle login error
      }
    });
  }
}