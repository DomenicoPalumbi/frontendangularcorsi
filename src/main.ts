import { bootstrapApplication }   from '@angular/platform-browser';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient }      from '@angular/common/http';   // 👈  NEW

import { App }     from './app/app';
import { routes }  from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withDebugTracing()), // tracing: rimuovilo quando hai finito
    provideHttpClient()                        // 👈  rende HttpClient disponibile a tutti
  ]
}).catch(err => console.error(err));
