import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],

})
export class PublicProfileComponent implements OnInit {
  username: string = '';
  userData: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.loadUser();
  }

  loadUser() {
    this.authService.getUserByUsername(this.username).subscribe({
      next: (data) => this.userData = data,
      error: () => console.warn('User nicht gefunden 😢')
    });
  }
}
