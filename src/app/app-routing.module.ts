import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent:
          ()=>import('./auth/components/login/login.component')
          .then(m=>m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: 
          ()=>import('./auth/components/register/register.component')
          .then(m=>m.RegisterComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
