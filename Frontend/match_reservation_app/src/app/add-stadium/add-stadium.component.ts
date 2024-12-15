import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stadium',
  standalone: false,
  
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {
  stadiumForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stadiumForm = this.fb.group({
      stadiumName: ['', [Validators.required, Validators.minLength(3)]],
      rows: ['', [Validators.required, Validators.min(1)]],
      seatsPerRow: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.stadiumForm.valid) {
      console.log('Stadium Details:', this.stadiumForm.value);
      // Add logic to save the stadium details
    }
  }

  resetForm() {
    this.stadiumForm.reset();
  }
}
