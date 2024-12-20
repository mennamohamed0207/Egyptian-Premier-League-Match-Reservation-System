import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone:false,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  matches: any[] = [];
  userType: 'fan' | 'manager' | 'site_admin' = 'fan'; // Default user type
  token: string | null = null;
  username: string | null = null;
  private subscription: Subscription | undefined;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.loadData();
    });

      // Check if running in the browser
  if (typeof window !== 'undefined') {
    this.token = localStorage.getItem('accessToken');
    this.username = localStorage.getItem('username'); // Assume username is also stored
  }
  }

  loadData(): void {
    this.subscription = this.matchService.getMatches().subscribe((data) => {
      this.matches = data;
      // console.log(this.matches);
    });
  }

  // Logout method
  onLogout(): void {
    // Clear token and username
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    this.token = null;
    this.username = null;

    // Redirect to home or login page
    this.router.navigate(['/login']);
  }

  onManageMatches(): void {
    console.log('Navigating to manage matches...');
    // Implement navigation or action
  }

  onViewReports(): void {
    console.log('Viewing reports...');
    // Implement navigation or action
  }
}
