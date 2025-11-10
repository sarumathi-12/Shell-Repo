import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  {
    path: 'debt',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.debt,
        exposedModule: './DebtModule',
      }).then((m: { DebtModule: any; }) => m.DebtModule),
      canActivate : [AuthGuard],
      data: {
      title: 'Debt',
    },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
