// push.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PushService {
  async registerServiceWorker(): Promise<void> {
    console.log('🛎️ (Fake) Service Worker registriert');
  }

  async subscribeToPush(user: any, vapidKey: string): Promise<void> {
    console.log('🔔 (Fake) Push aktiviert für:', user?.username || user?.email);
  }
}
