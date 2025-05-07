import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setLoggedIn(status: boolean) {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false'); // Store login state
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'; // Retrieve login state
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Clear login state
  }
}