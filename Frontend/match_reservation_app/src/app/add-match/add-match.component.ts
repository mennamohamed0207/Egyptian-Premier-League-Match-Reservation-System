import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-match',
  standalone: false,
  
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent {
  matchForm: FormGroup;
  teams = ['Team A', 'Team B', 'Team C', 'Team D']; // Replace with your team list
  venues = ['Stadium 1', 'Stadium 2', 'Stadium 3']; // Replace with your venue list
  referees = ['Referee 1', 'Referee 2', 'Referee 3']; // Replace with referee list
  linesmen = ['Linesman 1', 'Linesman 2', 'Linesman 3']; // Replace with linesmen list

  constructor(private fb: FormBuilder) {
    this.matchForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      venue: ['', Validators.required],
      matchDate: ['', Validators.required],
      mainReferee: ['', Validators.required],
      linesman1: ['', Validators.required],
      linesman2: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.matchForm.valid) {
      console.log('Match Details:', this.matchForm.value);
      // Add your submission logic here
    }
  }

  resetForm() {
    this.matchForm.reset();
  }
}
