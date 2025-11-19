import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatCardModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ------------------- Component Creation -------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ------------------- Form Initialization -------------------
  describe('Form Initialization', () => {
    it('should initialize loginForm with email and password controls', () => {
      expect(component.loginForm.contains('email')).toBeTrue();
      expect(component.loginForm.contains('password')).toBeTrue();
    });

    it('should have empty initial values', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });
  });

  // ------------------- Validators -------------------
  describe('Form Validators', () => {
    it('should require email', () => {
      const control = component.loginForm.get('email');
      control?.setValue('');
      expect(control?.hasError('required')).toBeTrue();
    });

    it('should validate email pattern', () => {
      const control = component.loginForm.get('email');
      control?.setValue('invalid-email');
      expect(control?.hasError('pattern')).toBeTrue();
      control?.setValue('valid@gmail.com');
      expect(control?.valid).toBeTrue();
    });

    it('should require password', () => {
      const control = component.loginForm.get('password');
      control?.setValue('');
      expect(control?.hasError('required')).toBeTrue();
    });

    it('should validate password length and pattern', () => {
      const control = component.loginForm.get('password');
      control?.setValue('short');
      expect(control?.hasError('minlength')).toBeTrue();

      control?.setValue('NoSpecial1');
      expect(control?.hasError('pattern')).toBeTrue();

      control?.setValue('Valid@123');
      expect(control?.valid).toBeTrue();
    });
  });

  // ------------------- Toggle Password -------------------
  describe('Password Visibility', () => {
    it('should toggle password visibility', () => {
      expect(component.hidePassword).toBeTrue();
      component.togglePasswordVisibility();
      expect(component.hidePassword).toBeFalse();
    });
  });

  // ------------------- onSubmit -------------------
  describe('onSubmit', () => {
    it('should login successfully with correct credentials', () => {
      component.loginForm.setValue({
        email: 'saru12@gmail.com',
        password: 'Password@123',
      });

      component.onSubmit();

      expect(toastrSpy.success).toHaveBeenCalledWith('Login successful!', 'Success');
      expect(authServiceSpy.login).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/debt']);
    });

    it('should show error for invalid credentials and reset form', () => {
      component.loginForm.setValue({
        email: 'wrong@example.com',
        password: 'Wrong@123',
      });

      component.onSubmit();

      expect(toastrSpy.error).toHaveBeenCalledWith('Invalid credentials', 'Error');
      expect(component.loginForm.get('email')?.value).toBeNull();
      expect(component.loginForm.get('password')?.value).toBeNull();
    });

    it('should mark all controls as touched if form invalid', () => {
      component.loginForm.setValue({ email: '', password: '' });
      component.onSubmit();
      expect(component.loginForm.get('email')?.touched).toBeTrue();
      expect(component.loginForm.get('password')?.touched).toBeTrue();
    });
  });
  });
