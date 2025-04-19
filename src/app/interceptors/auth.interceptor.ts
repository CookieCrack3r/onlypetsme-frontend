import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpErrorResponse
  } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { AuthService } from '../services/auth.service';
  import { catchError, switchMap, throwError } from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../environments/environment';
  
  export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const http = inject(HttpClient);
    const token = authService.getToken();
  
    const clonedReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;
  
    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && authService.getRefreshToken()) {
          console.warn('🔁 Access-Token abgelaufen – versuche Refresh...');
  
          return http.post<any>(`${environment.apiBaseUrl}/user/token/refresh/`, {
            refresh: authService.getRefreshToken()
          }).pipe(
            switchMap((response) => {
              console.log('✅ Access-Token aktualisiert');
              localStorage.setItem('access_token', response.access);
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.access}` }
              });
              return next(newReq);
            }),
            catchError((refreshError) => {
              console.error('❌ Refresh fehlgeschlagen – ausloggen...');
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
  
        return throwError(() => error);
      })
    );
  };
  