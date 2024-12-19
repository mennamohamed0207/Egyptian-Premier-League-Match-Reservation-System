import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: false,

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private matchService: MatchService, private route: ActivatedRoute) { }
  private subscription: Subscription | undefined;

  loadData(): void {
    this.subscription = this.matchService.getMatches().subscribe(
      (data) => {
        this.matches = data;
        console.log
          (this.matches);
      }
    );
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadData();
    });
  }
  matches = [];
  // Define the user type variable
  userType: 'fan' | 'manager' | 'site_admin' = 'manager';

  // Example method to set userType
  setUserType(type: 'fan' | 'manager' | 'site_admin') {
    this.userType = type;
  }
  getUserType(): any {
    return this.userType;
  }
  onManageMatches() {
    console.log('Navigating to manage matches...');
    // Implement navigation or action
  }

  onViewReports() {
    console.log('Viewing reports...');
    // Implement navigation or action
  }
}
