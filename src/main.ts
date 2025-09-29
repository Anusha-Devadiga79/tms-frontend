import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { appRoutes } from './app/app.routes';
import { jwtInterceptor } from './app/services/jwt.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
});
