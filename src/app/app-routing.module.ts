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
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./core/components/main-page/main-page.component')
      .then((m) => m.MainPageComponent),
    children: [
      {
        path: ':subjectname',
        children: [
          {
            path: 'posts',
            loadComponent:
              ()=>import('./features/posts/posts.component')
              .then(m=>m.PostsComponent)
          },
          {
            path: 'grades',
            loadComponent: 
              ()=>import('./features/grades/grades.component')
              .then(m=>m.GradesComponent)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
