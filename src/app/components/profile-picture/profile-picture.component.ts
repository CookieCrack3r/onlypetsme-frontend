import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AvatarUploadComponent } from '../avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  imports: [CommonModule, MatCardModule, AvatarUploadComponent],
})
export class ProfilePictureComponent implements OnInit {
  avatarUrl: string = '';
  previewUrl: string | null = null;
  defaultAvatar = 'assets/default-avatar.png';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.reloadAvatar();
  }

  get currentAvatar(): string {
    return this.previewUrl || this.avatarUrl || this.defaultAvatar;
  }

  reloadAvatar(): void {
    this.authService.fetchUserProfile().subscribe((user) => {
      const avatarPath = user.avatar;
      const isAbsolute = avatarPath?.startsWith('http');
  
      this.avatarUrl = avatarPath
        ? (isAbsolute ? avatarPath : `${environment.apiBaseUrl.replace(/\/$/, '')}${avatarPath}`)
        : this.defaultAvatar;
    });
  }
  

  onPreviewSelected(dataUrl: string) {
    this.previewUrl = dataUrl;
  }
}
