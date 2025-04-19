import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editable-area',
  standalone: true,
  templateUrl: './editable-area.component.html',
  styleUrls: ['./editable-area.component.scss'],
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule]
})
export class EditableAreaComponent implements OnInit {
  bio: string = '';
  originalBio: string = '';
  editing = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.fetchUserProfile().subscribe(user => {
      this.bio = user.bio || '';
      this.originalBio = this.bio;
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  save(): void {
    this.authService.updateProfile({ bio: this.bio }).subscribe({
      next: () => {
        this.originalBio = this.bio;
        this.editing = false;
      },
      error: () => {
        alert("❌ Fehler beim Speichern der Bio.");
      }
    });
  }

  cancel(): void {
    this.bio = this.originalBio;
    this.editing = false;
  }
}
