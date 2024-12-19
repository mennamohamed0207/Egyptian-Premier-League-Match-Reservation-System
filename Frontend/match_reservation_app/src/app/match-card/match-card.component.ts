import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-card',
  standalone: false,
  
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {
  @Input() match!: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    dateTime: string;
    stadium: string;
    mainReferee: string;
  };

  bookTicket(matchId: string) {
    console.log(`Ticket booked for match ID: ${matchId}`);
    // Add navigation or service logic for booking
  }
}
