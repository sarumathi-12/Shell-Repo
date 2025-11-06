import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  private readonly mockUser = {
    email: 'saru12@gmail.com',
    password: 'Password@123',
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      ),]],
      password: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,20}$/
      ),]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === this.mockUser.email && password === this.mockUser.password) {
        this.toastr.success('Login successful!', 'Success');
        this.authService.login();
        this.router.navigate(['/debt']);
      } else {
        this.toastr.error('Invalid credentials', 'Error');
        this.loginForm.reset();
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
