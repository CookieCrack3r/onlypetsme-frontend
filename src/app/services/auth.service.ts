import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private userSubject = new BehaviorSubject<any>(null);
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * 🔐 Login
   */
  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.baseUrl}/login/`; // statt /login/


    return this.http.post<{ access: string; refresh: string }>(loginUrl, { username, password }).pipe(
      tap((tokens) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        this.authStatusSubject.next(true);

        // ✅ Weiterleitung zur Profilseite
        this.router.navigate(['/profile']);
      })
    );
  }

  /**
   * 🧍‍♂️ Benutzerprofil laden
   */
  fetchUserProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.error('Kein Token vorhanden');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/user/profile/`, { headers }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  /**
   * 🚪 Logout
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userSubject.next(null);
    this.authStatusSubject.next(false);

    // ⛔ Force reload to reset state
    window.location.href = '/login';
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserByUsername(username: string): Observable<any> {
    const url = `${this.baseUrl}/user/${username}/`;
    return this.http.get(url);
  }
  
  updateProfile(data: { bio?: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.patch(`${this.baseUrl}/user/profile/`, data, { headers });
  }
  
}
