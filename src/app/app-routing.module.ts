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
            path: '',
            pathMatch: 'full',
            redirectTo: 'posts'
          },
          {
            path: 'posts',
            loadComponent:
              ()=>import('./features/pages/components/posts/posts.component')
              .then(m=>m.PostsComponent)
          },
          {
            path: 'grades',
            loadComponent: 
              ()=>import('./features/pages/components/grades/grades.component')
              .then(m=>m.GradesComponent)
          },
          {
            path: 'students',
            loadComponent:
              ()=>import('./features/pages/components/students/students.component')
              .then(m=>m.StudentsComponent)
          }
        ]
      },
    ]
  },
  {
    path: 'newclass',
    loadComponent:
      ()=>import('./features/add-class-page/components/add-class/add-class.component')
      .then(m=>m.AddClassComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
