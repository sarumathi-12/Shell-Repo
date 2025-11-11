import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Overlay } from '@angular/cdk/overlay';
import { DEFAULT_ENCAPSULATION } from './_shared/constants/debt.const';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: DEFAULT_ENCAPSULATION
})
export class AppComponent {

  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService, private overlay: Overlay) { }

  public get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }


public openLogoutDialog() {
  const dialogRef = this.dialog.open(this.logoutDialog, {
    width: '320px',
    disableClose: true,
    panelClass: 'logout-dialog-panel'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) this.logout();
  });
}


  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public confirmLogout(): void {
    this.dialog.closeAll();
    this.logout();
  }

  public logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
