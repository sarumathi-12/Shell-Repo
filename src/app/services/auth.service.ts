import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor() { }

  public login(): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }
  
  public isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
