import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  matches = [
    {
      id: '1',
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      date: '2024-12-10',
      time: '7:00 PM',
      stadium: 'Stadium 1',
      stadiumImage: 'stadium1.jpg',
    },
    {
      id: '2',
      homeTeam: 'Team C',
      awayTeam: 'Team D',
      date: '2024-12-12',
      time: '8:00 PM',
      stadium: 'Stadium 2',
      stadiumImage: 'stadium2.jpeg',
    },
    {
      id: '3',
      homeTeam: 'Team E',
      awayTeam: 'Team F',
      date: '2024-12-14',
      time: '9:00 PM',
      stadium: 'Stadium 3',
      stadiumImage: 'stadium3.jpg',
    }
  ];
  // Define the user type variable
  userType: 'fan' | 'manager' | 'site_admin' = 'manager';

  // Example method to set userType
  setUserType(type: 'fan' | 'manager' | 'site_admin') {
    this.userType = type;
  }
  getUserType():any
  {
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
