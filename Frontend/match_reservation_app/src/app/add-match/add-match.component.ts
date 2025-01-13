import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-match',
  standalone: false,
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit{
  matchForm: FormGroup;
  teams = ['Team A', 'Team B', 'Team C', 'Team D']; // Replace with your team list
  venues = [
    { id: '60dabc1234567890abcdef12', name: 'Stadium 1' }, 
    { id: '60dabc1234567890abcdef13', name: 'Stadium 2' },
    { id: '60dabc1234567890abcdef14', name: 'Stadium 3' }
  ]; // Replace with your venue list
  referees = ['Referee 1', 'Referee 2', 'Referee 3']; // Replace with referee list
  linesmen = ['Linesman 1', 'Linesman 2', 'Linesman 3']; // Replace with linesmen list

  constructor(private fb: FormBuilder, private matchService: MatchService, private router: Router) {
    this.matchForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      dateTime: ['', Validators.required],
      venue: ['', Validators.required],
      mainReferee: ['', Validators.required],
      linesman1: ['', Validators.required],
      linesman2: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    this.matchService.getStadiums().subscribe((data) => {
      console.log(data);
      this.venues = data;

    });
  }

  onSubmit() {
    if (this.matchForm.valid) {
      const formValues = this.matchForm.value;
      console.log('Match Details:', formValues);
      console.log('Venue ID:', formValues.venue.name);
      const match = {
        homeTeam: formValues.homeTeam,
        awayTeam: formValues.awayTeam,
        stadiumID: formValues.venue._id, // Replace with your stadium ID
        dateTime: formValues.dateTime,
        mainReferee: formValues.mainReferee,
        linesman1: formValues.linesman1,
        linesman2: formValues.linesman2,
        seats: []
        
      };
      console.log('Match:', match);
      this.matchService.addMatch(match).subscribe({
        next: (response) => {
          console.log('Match added successfully:', response);
          this.resetForm();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error adding match:', err);
          alert('Failed to add match');
        }
      });
    } else {
      alert('Please fill in all required fields');
    }
  }

  resetForm() {
    this.matchForm.reset();
  }
}
