import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-online-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './online-list.component.html',
})
export class OnlineListComponent implements OnInit {
  onlineUsers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(`${environment.apiBaseUrl}/user/all/`, { headers }).subscribe({
      next: (users) => {
        this.onlineUsers = users; // oder filter für online status
      },
      error: (err) => console.error('❌ Fehler beim Laden der Benutzer:', err)
    });
  }
}
