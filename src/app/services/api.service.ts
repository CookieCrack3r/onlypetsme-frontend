import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    return this.http.get<T>(url, {
      headers: this.getAuthHeaders()
    });
  }


  post<T>(endpoint: string, body: any = {}): Observable<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    return this.http.post<T>(url, body, {
      headers: this.getAuthHeaders()
    });
  }

  put<T>(endpoint: string, body: any = {}): Observable<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    return this.http.put<T>(url, body, {
      headers: this.getAuthHeaders()
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    return this.http.delete<T>(url, {
      headers: this.getAuthHeaders()
    });
  }
  patch<T>(endpoint: string, body: any = {}): Observable<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    return this.http.patch<T>(url, body, {
      headers: this.getAuthHeaders()
    });
  }

}
