import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  token: string | null = null;
  username: string | null = null;
  ngOnInit(): void {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
      this.username = localStorage.getItem('username'); // Assume username is also stored
    }
  }
  onLogout(): void {
    // Clear token and username
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    this.token = null;
    this.username = null;

    // Redirect to home or login page
    this.router.navigate(['/login']);
  }

}
