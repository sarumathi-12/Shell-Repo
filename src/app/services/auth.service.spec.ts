import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const AUTH_KEY = 'isAuthenticated';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ------------------ LOGIN ------------------
  it('should set AUTH_KEY to true on login', () => {
    service.login();
    expect(localStorage.getItem(AUTH_KEY)).toBe('true');
  });

  // ------------------ LOGOUT ------------------
  it('should remove AUTH_KEY on logout', () => {
    localStorage.setItem(AUTH_KEY, 'true');

    service.logout();

    expect(localStorage.getItem(AUTH_KEY)).toBeNull();
  });

  // ------------------ isAuthenticated ------------------
  it('should return true when AUTH_KEY is true in localStorage', () => {
    localStorage.setItem(AUTH_KEY, 'true');
    expect(service.isAuthenticated()).toBeTrue();
  });


  it('should return false when AUTH_KEY value is not "true"', () => {
    localStorage.setItem(AUTH_KEY, 'false');
    expect(service.isAuthenticated()).toBeFalse();
  });
});
