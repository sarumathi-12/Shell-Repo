import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.toastr.warning('Please log in first!', 'Access Denied');
      return this.router.parseUrl('/login');
    }
  }
}
