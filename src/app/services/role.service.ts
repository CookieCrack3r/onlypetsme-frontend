// role.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  getUserRole(): string {
    return 'user'; // oder später aus dem Token extrahieren
  }
}
