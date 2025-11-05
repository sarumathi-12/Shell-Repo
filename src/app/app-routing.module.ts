import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'src/environments/environment';

const routes: Routes = [ {
    path: 'debt',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.debt,
        exposedModule: './DebtModule',
      }).then((m: { DebtModule: any; }) => m.DebtModule),
      data: {
      title: 'Debt',
    },
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
