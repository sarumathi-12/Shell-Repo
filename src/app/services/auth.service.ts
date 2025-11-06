import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor() {}

  login(): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
