import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMenu = false; 

  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService, private overlay: Overlay) { }

  get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  openLogoutDialog() {
    this.showMenu = false;
    const dialogRef = this.dialog.open(this.logoutDialog, {
      width: '320px',
      disableClose: true,
      panelClass: 'logout-dialog-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.logout();
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  confirmLogout(): void {
    this.dialog.closeAll();
    this.logout();
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
