import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editable-area',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <mat-form-field appearance="outline" class="editor-field">
      <mat-label>Über mich</mat-label>
      <textarea matInput [(ngModel)]="aboutMe" rows="10"
        placeholder="Schreib hier was über dich oder deine Tiere..."></textarea>
    </mat-form-field>
  `,
  styles: [`
    .editor-field {
      width: 100%;
    }
  `]
})
export class EditableAreaComponent implements OnInit {
  aboutMe: string = '';

  ngOnInit(): void {
    const saved = localStorage.getItem('aboutMe');
    if (saved) this.aboutMe = saved;
  }

  // Optional: Auto-Save on change
  ngOnChanges(): void {
    localStorage.setItem('aboutMe', this.aboutMe);
  }
}
