import { Component } from '@angular/core';
import { chdir } from 'node:process';

@Component({
  selector: 'app-match-page',
  standalone: false,

  templateUrl: './match-page.component.html',
  styleUrl: './match-page.component.css',
})
export class MatchPageComponent {
  rows: number = 3;
  cols: number = 5;

  available= '#ecf39eff'; 
  reserved= '#31572cff';   
  selected= 'rgb(137, 224, 60)';   
  chairs_colors : string[][] = [];
  reserved_chairs : number[][] = [[0,1,1,0,1],[0,0,0,1,1],[1,0,1,0,1]];
  constructor() {
    for (let i = 0; i < this.rows; i++) {
      let chairs_row : string[] = [];
      for (let j = 0; j < this.cols; j++) {
        if (this.reserved_chairs[i][j] == 1 )
           chairs_row.push(this.reserved);
        else
           chairs_row.push(this.available);
          
      }
      this.chairs_colors.push(chairs_row);
    }
  }
  changeColor(i:number,j:number) {
    if (this.chairs_colors[i][j] == this.reserved) return;
    this.chairs_colors[i][j] =
      this.chairs_colors[i][j] == this.available ? this.selected : this.available;
  }
}
