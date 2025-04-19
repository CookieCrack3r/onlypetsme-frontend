import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-online-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <mat-list>
      <h3 mat-subheader>Online Freunde</h3>
      <mat-list-item *ngFor="let user of onlineUsers">
        🟢 {{ user }}
      </mat-list-item>
    </mat-list>
  `
})
export class OnlineListComponent {
  onlineUsers = ['Milo 🐶', 'Luna 🐱', 'Buddy 🐾'];
}
