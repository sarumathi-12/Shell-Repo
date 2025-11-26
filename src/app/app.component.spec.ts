import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TemplateRef } from '@angular/core';
import { of, Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

    beforeEach(async () => {
        dialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/login' });
        authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

        dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        dialogRefSpy.afterClosed.and.returnValue(of(true));  

        dialogSpy.open.and.returnValue(dialogRefSpy);

        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                MatDialogModule,
                RouterOutlet,
                MatMenuModule,
                MatIconModule,
                MatDividerModule,
                BrowserAnimationsModule
            ],

            providers: [
                { provide: MatDialog, useValue: dialogSpy },
                { provide: Router, useValue: routerSpy },
                { provide: AuthService, useValue: authServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        component.logoutDialog = {} as TemplateRef<any>; 
        fixture.detectChanges();
    });

    // ----------------------------------------------------
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // ----------------------------------------------------
    describe('openLogoutDialog', () => {
        it('should open logout dialog', () => {
            component.openLogoutDialog();
            expect(dialogSpy.open).toHaveBeenCalled();
        });

        it('should call logout() when dialog returns true', () => {
            component.openLogoutDialog();
            expect(authServiceSpy.logout).toHaveBeenCalled();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        });
    });

    // ----------------------------------------------------
    describe('closeDialog', () => {
        it('should close all dialogs', () => {
            component.closeDialog();
            expect(dialogSpy.closeAll).toHaveBeenCalled();
        });
    });

    // ----------------------------------------------------
    describe('confirmLogout', () => {
        it('should close dialogs and logout', () => {
            component.confirmLogout();
            expect(dialogSpy.closeAll).toHaveBeenCalled();
            expect(authServiceSpy.logout).toHaveBeenCalled();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        });
    });

    // ----------------------------------------------------
    describe('logout', () => {
        it('should call AuthService.logout and navigate to login', () => {
            component.logout();
            expect(authServiceSpy.logout).toHaveBeenCalled();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        });
    });
});
