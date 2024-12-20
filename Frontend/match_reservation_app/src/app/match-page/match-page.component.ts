import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../services/match.service';
import { CancelReservationDialogComponent } from '../cancel-reservation-dialog/cancel-reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationConfirmationDialogComponent } from '../reservation-confirmation-dialog/reservation-confirmation-dialog.component';

@Component({
  selector: 'app-match-page',
  standalone: false,

  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css', '../app.component.css'],

})
export class MatchPageComponent implements OnInit {
  matchid: any;
  /*{
    "homeTeam": "Team A",
    "awayTeam": "Team B",
    "stadiumID": {
      "name": "Cairo Stadium",
      "length": 40,
      "width": 20
    },
    "dateTime": "2024-12-15T16:00:00Z",
    "mainReferee": "Referee Name",
    "linesman1": "Linesman 1",
    "linesman2": "Linesman 2"
  } */
  match!: {
    _id: string;
    homeTeam: string;
    awayTeam: string;
    dateTime: string;
    stadiumID: {
      name: string,
      length: number,
      width: number
    };
    mainReferee: string;
    linesman1: string;
    linesman2: string;

    seats: number[][];
  };
  rows: number = 0;
  cols: number = 0;
  available = '#ecf39eff';
  reserved = '#31572cff';
  selected = 'rgb(137, 224, 60)';
  chairs_colors: string[][] = [];
  reserved_chairs: number[][] = [[0, 1, 1, 0, 1], [0, 0, 0, 1, 1], [1, 0, 1, 0, 1]];
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.matchid = params['id'];
    }

    );
    this.dataService.getMatch(this.matchid).subscribe((data) => {
      this.match = data;
      console.log(this.match);
      this.rows = this.match.stadiumID.length;
      this.cols = this.match.stadiumID.width;
      this.reserved_chairs = this.match.seats;
      for (let i = 0; i < this.rows; i++) {
        let chairs_row: string[] = [];
        for (let j = 0; j < this.cols; j++) {
          if (this.reserved_chairs[i][j] == 1)
            chairs_row.push(this.reserved);
          else
            chairs_row.push(this.available);

        }
        this.chairs_colors.push(chairs_row);
      }
    });
  }


  selectedChairs: {
    seatRowIndex: number;
    seatColumnIndex: number;
  }[] = [];

  constructor(private route: ActivatedRoute, private dataService: MatchService, public dialog: MatDialog) {
  }
  changeColor(i: number, j: number) {
    if (this.chairs_colors[i][j] == this.reserved) return;
    this.chairs_colors[i][j] =
      this.chairs_colors[i][j] == this.available ? this.selected : this.available;
    //store the selected chairs to send them to backend
    this.selectedChairs.push({
      seatRowIndex: i,
      seatColumnIndex: j
    });
  }
  addTicket() {
    for (let i = 0; i < this.selectedChairs.length; i++) {
      this.dataService.reserveSeat(this.matchid, this.selectedChairs[i]).subscribe(
        (data) => {
          console.log(data);

        });
    }
    // Update reserved seats color
    this.selectedChairs.forEach(({ seatRowIndex, seatColumnIndex }) => {
      this.chairs_colors[seatRowIndex][seatColumnIndex] = this.reserved;
    });

    // Show confirmation dialog
    this.dialog.open(ReservationConfirmationDialogComponent);

    // Clear the selected chairs array
    this.selectedChairs = [];

  }


}
