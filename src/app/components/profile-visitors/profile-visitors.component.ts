import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile-visitors',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <mat-list>
      <h3 mat-subheader>Letzte Besucher</h3>
      <mat-list-item *ngFor="let visitor of visitors">
        👀 {{ visitor }}
      </mat-list-item>
    </mat-list>
  `
})
export class ProfileVisitorsComponent {
  visitors = ['Toby 🐕', 'Nala 🐈', 'Leo 🦴'];
}
