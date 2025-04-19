import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { ProfilePageComponent } from './app/components/profile-page/profile-page.component';
import { AuthGuard } from './app/guards/auth.guard';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicProfileComponent } from './app/components/public-profile/public-profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'user/:username', component: PublicProfileComponent }, // Fremdprofil
  { path: '', redirectTo: 'profile', pathMatch: 'full' }, // Startseite
  { path: '**', redirectTo: 'profile' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])) // ✅ Interceptor korrekt eingebunden
  ]
}).catch(err => console.error(err));
