import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
  imports: [CommonModule, MatButtonModule, MatCardModule],
})
export class AvatarUploadComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  @Output() previewSelected = new EventEmitter<string>();
  @Output() avatarChanged = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.previewSelected.emit(this.previewUrl);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadAvatar() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', this.selectedFile);

    this.http
      .patch(`${environment.apiBaseUrl}/user/upload-avatar/`, formData)
      .subscribe({
        next: () => {
          alert('✅ Avatar erfolgreich hochgeladen!');
          this.avatarChanged.emit(); // Signal an Parent senden
        },
        error: (err) =>
          alert('❌ Upload fehlgeschlagen: ' + err.message),
      });
  }
}
