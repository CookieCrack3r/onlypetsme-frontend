// realtime.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  connect(userId: number): void {
    console.log(`🔌 (Fake) Realtime-Verbindung für User ${userId} gestartet`);
  }
}
