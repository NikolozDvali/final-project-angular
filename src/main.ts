import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/routes';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { AppComponent } from './app/core/components/app/app.component';


bootstrapApplication(AppComponent, {
  providers: [CommonModule, 
      importProvidersFrom(HttpClientModule),
      provideRouter(routes)
  ],

});