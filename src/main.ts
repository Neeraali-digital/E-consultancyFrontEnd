import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

bootstrapApplication(App, appConfig)
  .catch((err: any) => {
    if (!environment.production) {
      console.error('Application bootstrap failed:', err);
    }
    // In production, you might want to send errors to a logging service
  });
