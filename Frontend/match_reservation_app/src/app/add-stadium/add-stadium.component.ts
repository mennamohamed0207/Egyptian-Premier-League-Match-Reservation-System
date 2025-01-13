import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stadium',
  standalone: false,
  
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {
  stadiumForm: FormGroup;

  constructor(private fb: FormBuilder, private stadiumService: MatchService, private router: Router) {
    this.stadiumForm = this.fb.group({
      stadiumName: ['', [Validators.required, Validators.minLength(3)]],
      rows: ['', [Validators.required, Validators.min(1)]],
      seatsPerRow: ['', [Validators.required, Validators.min(1)]],
    });
  }
  onSubmit() {
    if (this.stadiumForm.valid) {
      const formValues = this.stadiumForm.value;

      // Transform form values to match the JSON structure
      const stadium = {
        name: formValues.stadiumName,
        length: Number(formValues.rows),          // Assuming length maps to rows
        width: Number(formValues.seatsPerRow)     // Assuming width maps to seats per row
      };

      // Send the POST request
      this.stadiumService.addStadium(stadium).subscribe({
        next: (response) => {
          console.log('Stadium added successfully:', response);
          alert('Stadium added successfully');
          this.router.navigate(['home']);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error adding stadium:', err.message);
          alert('Failed to add stadium');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }


  resetForm() {
    this.stadiumForm.reset();
  }
}
