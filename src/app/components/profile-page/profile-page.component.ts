import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { OnlineListComponent } from '../online-list/online-list.component';
import { ProfileVisitorsComponent } from '../profile-visitors/profile-visitors.component';
import { EditableAreaComponent } from '../editable-area/editable-area.component';
import { AuthService } from '../../services/auth.service';

@Component({
  
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    ProfilePictureComponent,
    OnlineListComponent,
    ProfileVisitorsComponent,
    EditableAreaComponent
  ]
  ,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent {

  constructor(public authService: AuthService) {} // ⬅️ AuthService injizieren

  logout() {
    this.authService.logout();
  }
  
}
