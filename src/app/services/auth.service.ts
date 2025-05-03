import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  setLoggedIn(status: boolean) {
    this.loggedIn = status;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}