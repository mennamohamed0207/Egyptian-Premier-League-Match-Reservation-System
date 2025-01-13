import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-card',
  standalone: false,
  
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {
  @Input() match!: {
    _id: number;
    homeTeam: string;
    awayTeam: string;
    dateTime: string;
    stadium: string;
    mainReferee: string;
    linesman1: string;
    linesman2: string;
    stadiumLength: number;  
    stadiumWidth: number;
    stadiumName: string;
    seats: number[][];
  };
  constructor(private router: Router) {}

  bookTicket(matchId: number): void {
    this.router.navigateByUrl('/match/' + matchId, { state: { data: this.match } });
  }
  notuser(): boolean {
    // const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    // console.log(token);
    
    // if (token==null){

    //   return false;
    // }
    // else{
    //   return true;
    // }
    return false;
  }
}
