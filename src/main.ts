import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { StartPageComponent } from './app/components/start-page/start-page.component';
import { LoginComponent } from './app/components/login/login.component';
import { ProfilePageComponent } from './app/components/profile-page/profile-page.component';
import { AuthGuard } from './app/guards/auth.guard';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])) // ✅ Interceptor korrekt eingebunden
  ]
}).catch(err => console.error(err));
