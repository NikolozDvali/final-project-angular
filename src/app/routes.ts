import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isTeacherGuard } from './shared/guards/is-teacher/is-teacher.guard';
import { isStudentGuard } from './shared/guards/is-student/is-student.guard';
import { isLoggedInGuard } from './shared/guards/is-logged-in/is-logged-in.guard';
import { isLoggedOutGuard } from './shared/guards/is-logged-out/is-logged-out.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: 
      ()=>import('./core/components/page-not-found/page-not-found.component')
      .then(m=>m.PageNotFoundComponent)
  },
  {
    path: 'auth',
    canActivate: [isLoggedOutGuard],
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
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./core/components/main-page/main-page.component')
      .then((m) => m.MainPageComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'classroom/posts'
      },
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
              .then(m=>m.GradesComponent),
            canActivate: [isStudentGuard]
          },
          {
            path: 'students',
            loadComponent:
              ()=>import('./features/pages/components/students/students.component')
              .then(m=>m.StudentsComponent)
          },
          {
            path: '**',
            loadComponent: 
              ()=>import('./core/components/page-not-found/page-not-found.component')
              .then(m=>m.PageNotFoundComponent)
          },
        ]
      },
    ]
  },
  {
    path: 'newclass',
    loadComponent:
      ()=>import('./features/add-class-page/components/add-class/add-class.component')
      .then(m=>m.AddClassComponent),
    canActivate: [isTeacherGuard]
  },
  {
    path: '**',
    loadComponent: 
      ()=>import('./core/components/page-not-found/page-not-found.component')
      .then(m=>m.PageNotFoundComponent)
  },
];
